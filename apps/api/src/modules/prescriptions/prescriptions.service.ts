import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { DosageForm, PrescriptionStatus } from '@prisma/client';
import * as crypto from 'crypto';

export class PrescriptionItemInput {
  medicineName: string;
  genericName?: string;
  dosageForm: DosageForm;
  strength?: string;
  dosage: string;
  frequency: string;
  durationDays: number;
  instructions?: string;
  sortOrder?: number;
}

export class CreatePrescriptionDto {
  consultationId: string;
  patientId: string;
  doctorId: string;
  items: PrescriptionItemInput[];
}

@Injectable()
export class PrescriptionsService {
  constructor(private prisma: PrismaService) {}

  async createOrUpdateDraft(dto: CreatePrescriptionDto, userId: string) {
    let prescription = await this.prisma.prescription.findUnique({
      where: { consultationId: dto.consultationId },
    });

    if (prescription && prescription.status === PrescriptionStatus.APPROVED) {
      throw new BadRequestException(
        'This prescription has already been approved and sealed. It cannot be edited directly.',
      );
    }

    if (!prescription) {
      const datePrefix = new Date().toISOString().slice(0, 10).replace(/-/g, '');
      const randomSuffix = Math.floor(1000 + Math.random() * 9000);
      const prescriptionNumber = `RX-${datePrefix}-${randomSuffix}`;

      prescription = await this.prisma.prescription.create({
        data: {
          prescriptionNumber,
          consultationId: dto.consultationId,
          patientId: dto.patientId,
          doctorId: dto.doctorId,
          status: PrescriptionStatus.DRAFT,
          version: 1,
        },
      });
    }

    // Delete existing draft items and re-insert
    await this.prisma.prescriptionItem.deleteMany({
      where: { prescriptionId: prescription.id },
    });

    if (dto.items && dto.items.length > 0) {
      await this.prisma.prescriptionItem.createMany({
        data: dto.items.map((item, index) => ({
          prescriptionId: prescription.id,
          medicineName: item.medicineName,
          genericName: item.genericName,
          dosageForm: item.dosageForm,
          strength: item.strength,
          dosage: item.dosage,
          frequency: item.frequency,
          durationDays: item.durationDays,
          instructions: item.instructions,
          sortOrder: item.sortOrder ?? index,
        })),
      });
    }

    return this.prisma.prescription.findUnique({
      where: { id: prescription.id },
      include: {
        items: { orderBy: { sortOrder: 'asc' } },
        doctor: {
          include: { user: true },
        },
        patient: {
          include: { user: true },
        },
      },
    });
  }

  async approvePrescription(id: string, doctorId: string, userId: string) {
    const prescription = await this.prisma.prescription.findUnique({
      where: { id },
      include: {
        items: true,
        doctor: { include: { user: true } },
        patient: { include: { user: true } },
      },
    });

    if (!prescription) {
      throw new NotFoundException('Prescription not found');
    }

    if (prescription.doctorId !== doctorId) {
      throw new BadRequestException('Only the consulting doctor can approve this prescription.');
    }

    if (prescription.items.length === 0) {
      throw new BadRequestException('Cannot approve an empty prescription without medications.');
    }

    // Create cryptographic audit seal hash
    const hashData = `${prescription.id}|${prescription.prescriptionNumber}|${doctorId}|${Date.now()}|${JSON.stringify(
      prescription.items,
    )}`;
    const doctorSignatureHash = crypto.createHash('sha256').update(hashData).digest('hex');

    const approved = await this.prisma.prescription.update({
      where: { id },
      data: {
        status: PrescriptionStatus.APPROVED,
        doctorSignatureHash,
        approvedAt: new Date(),
        validUntil: new Date(Date.now() + 30 * 24 * 3600 * 1000), // 30 days validity per Telemedicine Guidelines
      },
      include: {
        items: { orderBy: { sortOrder: 'asc' } },
        doctor: { include: { user: true } },
        patient: { include: { user: true } },
      },
    });

    // Mark appointment as COMPLETED
    const consultation = await this.prisma.consultation.findUnique({
      where: { id: prescription.consultationId },
    });
    if (consultation) {
      await this.prisma.appointment.update({
        where: { id: consultation.appointmentId },
        data: { status: 'COMPLETED' },
      });
    }

    // Audit log
    await this.prisma.auditLog.create({
      data: {
        actorUserId: userId,
        action: 'PRESCRIPTION_APPROVED_AND_SEALED',
        resource: 'PRESCRIPTION',
        resourceId: id,
        ipAddress: '127.0.0.1',
        userAgent: 'DermaCare Clinical Portal',
        metadata: {
          prescriptionNumber: prescription.prescriptionNumber,
          signatureHash: doctorSignatureHash,
        },
      },
    });

    return approved;
  }

  async getPrescriptionById(id: string, requestingUser: any) {
    const prescription = await this.prisma.prescription.findUnique({
      where: { id },
      include: {
        items: { orderBy: { sortOrder: 'asc' } },
        doctor: { include: { user: true } },
        patient: { include: { user: true } },
        consultation: true,
      },
    });

    if (!prescription) {
      throw new NotFoundException('Prescription not found');
    }

    // Role-based resource level security check
    if (
      requestingUser.role === 'PATIENT' &&
      prescription.patient.userId !== requestingUser.id
    ) {
      throw new BadRequestException('Access denied: You can only view your own prescriptions.');
    }

    return prescription;
  }

  async getPatientPrescriptionHistory(patientId: string) {
    return this.prisma.prescription.findMany({
      where: {
        patientId,
        status: PrescriptionStatus.APPROVED,
      },
      include: {
        items: true,
        doctor: { include: { user: true } },
        consultation: true,
      },
      orderBy: { approvedAt: 'desc' },
    });
  }
}
