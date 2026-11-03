import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

export class SaveConsultationDto {
  appointmentId: string;
  doctorId: string;
  subjectiveSymptoms: string;
  durationOfComplaints?: string;
  objectiveFindings: string;
  lesionCharacteristics?: string;
  differentialDiagnosis?: string;
  finalDiagnosis: string;
  clinicalAdvice?: string;
  dietLifestyleAdvice?: string;
  followUpDays?: number;
}

@Injectable()
export class ConsultationsService {
  constructor(private prisma: PrismaService) {}

  async saveConsultation(dto: SaveConsultationDto, actorUserId: string) {
    const consultation = await this.prisma.consultation.upsert({
      where: { appointmentId: dto.appointmentId },
      update: {
        subjectiveSymptoms: dto.subjectiveSymptoms,
        durationOfComplaints: dto.durationOfComplaints,
        objectiveFindings: dto.objectiveFindings,
        lesionCharacteristics: dto.lesionCharacteristics,
        differentialDiagnosis: dto.differentialDiagnosis,
        finalDiagnosis: dto.finalDiagnosis,
        clinicalAdvice: dto.clinicalAdvice,
        dietLifestyleAdvice: dto.dietLifestyleAdvice,
        followUpDays: dto.followUpDays,
      },
      create: {
        appointmentId: dto.appointmentId,
        doctorId: dto.doctorId,
        subjectiveSymptoms: dto.subjectiveSymptoms,
        durationOfComplaints: dto.durationOfComplaints,
        objectiveFindings: dto.objectiveFindings,
        lesionCharacteristics: dto.lesionCharacteristics,
        differentialDiagnosis: dto.differentialDiagnosis,
        finalDiagnosis: dto.finalDiagnosis,
        clinicalAdvice: dto.clinicalAdvice,
        dietLifestyleAdvice: dto.dietLifestyleAdvice,
        followUpDays: dto.followUpDays,
      },
      include: {
        appointment: {
          include: {
            patient: {
              include: { user: true },
            },
          },
        },
        prescription: {
          include: { items: true },
        },
      },
    });

    await this.prisma.auditLog.create({
      data: {
        actorUserId,
        action: 'CONSULTATION_DOCUMENTED',
        resource: 'CONSULTATION',
        resourceId: consultation.id,
        ipAddress: '127.0.0.1',
        userAgent: 'DermaCare Clinical Portal',
        metadata: { finalDiagnosis: dto.finalDiagnosis },
      },
    });

    return consultation;
  }

  async getConsultationByAppointment(appointmentId: string) {
    const consultation = await this.prisma.consultation.findUnique({
      where: { appointmentId },
      include: {
        appointment: {
          include: {
            patient: {
              include: {
                user: true,
                medicalRecords: true,
              },
            },
            service: true,
          },
        },
        prescription: {
          include: { items: true },
        },
      },
    });

    if (!consultation) {
      throw new NotFoundException('Consultation note has not been created yet for this appointment.');
    }

    return consultation;
  }
}

