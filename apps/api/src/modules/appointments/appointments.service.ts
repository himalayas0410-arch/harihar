import {
  Injectable,
  ConflictException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { AppointmentStatus, MeetingProvider } from '@prisma/client';

export class ReserveSlotDto {
  patientId: string;
  doctorId?: string;
  serviceId: string;
  slotStartTime: string;
  slotEndTime: string;
  chiefComplaint?: string;
  meetingProvider?: MeetingProvider;
}

export class RescheduleSlotDto {
  newSlotStartTime: string;
  newSlotEndTime: string;
  reason?: string;
}

@Injectable()
export class AppointmentsService {
  constructor(private prisma: PrismaService) {}

  /**
   * Reserves an appointment slot with a 15-minute temporary lock.
   */
  async reserveSlot(dto: ReserveSlotDto, requestingUserId: string) {
    const slotStart = new Date(dto.slotStartTime);
    const slotEnd = new Date(dto.slotEndTime);
    const now = new Date();

    if (slotStart <= now) {
      throw new BadRequestException('Cannot book an appointment in the past');
    }

    // Resolve doctor
    const doctor = dto.doctorId
      ? await this.prisma.doctor.findUnique({ where: { id: dto.doctorId } })
      : await this.prisma.doctor.findFirst();

    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }

    // Resolve service
    const service = await this.prisma.service.findUnique({
      where: { id: dto.serviceId },
    });
    if (!service || !service.isActive) {
      throw new NotFoundException('Selected dermatology service is invalid or inactive');
    }

    // Check for conflicting appointments
    const conflict = await this.prisma.appointment.findFirst({
      where: {
        doctorId: doctor.id,
        slotStartTime: { lt: slotEnd },
        slotEndTime: { gt: slotStart },
        OR: [
          { status: AppointmentStatus.CONFIRMED },
          {
            status: AppointmentStatus.PENDING_PAYMENT,
            slotLockedUntil: { gt: now },
          },
        ],
      },
    });

    if (conflict) {
      throw new ConflictException(
        'This time slot was just selected by another patient or is already confirmed. Please choose another slot.',
      );
    }

    // Generate unique appointment number: DC-YYYYMMDD-XXXX
    const datePrefix = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const appointmentNumber = `DC-${datePrefix}-${randomSuffix}`;

    // 15-minute slot lock
    const slotLockedUntil = new Date(now.getTime() + 15 * 60 * 1000);

    const appointment = await this.prisma.appointment.create({
      data: {
        appointmentNumber,
        patientId: dto.patientId,
        doctorId: doctor.id,
        serviceId: service.id,
        slotStartTime: slotStart,
        slotEndTime: slotEnd,
        status: AppointmentStatus.PENDING_PAYMENT,
        slotLockedUntil,
        chiefComplaint: dto.chiefComplaint,
        meetingProvider: dto.meetingProvider || MeetingProvider.GOOGLE_MEET,
      },
      include: {
        patient: {
          include: {
            user: {
              select: { fullName: true, phoneNumber: true, email: true },
            },
          },
        },
        doctor: {
          include: {
            user: {
              select: { fullName: true },
            },
          },
        },
        service: true,
      },
    });

    // Record audit log
    await this.prisma.auditLog.create({
      data: {
        actorUserId: requestingUserId,
        action: 'SLOT_RESERVED',
        resource: 'APPOINTMENT',
        resourceId: appointment.id,
        ipAddress: '127.0.0.1',
        userAgent: 'DermaCare API',
        metadata: {
          appointmentNumber,
          priceInPaise: service.priceInPaise,
        },
      },
    });

    return appointment;
  }

  async getPatientAppointments(patientId: string) {
    return this.prisma.appointment.findMany({
      where: { patientId },
      include: {
        doctor: {
          include: {
            user: {
              select: { fullName: true },
            },
          },
        },
        service: true,
        payment: true,
        consultation: {
          include: {
            prescription: true,
          },
        },
      },
      orderBy: { slotStartTime: 'desc' },
    });
  }

  async getDoctorAppointments(doctorId: string, date?: string) {
    const whereClause: any = { doctorId };

    if (date) {
      const [year, month, day] = date.split('-').map(Number);
      const dayStart = new Date(Date.UTC(year, month - 1, day, 0, 0, 0) - 5.5 * 3600 * 1000);
      const dayEnd = new Date(dayStart.getTime() + 24 * 3600 * 1000);
      whereClause.slotStartTime = { gte: dayStart, lt: dayEnd };
    }

    return this.prisma.appointment.findMany({
      where: whereClause,
      include: {
        patient: {
          include: {
            user: {
              select: { fullName: true, phoneNumber: true, email: true },
            },
          },
        },
        service: true,
        payment: true,
        consultation: true,
      },
      orderBy: { slotStartTime: 'asc' },
    });
  }

  async getAppointmentById(id: string) {
    const appointment = await this.prisma.appointment.findUnique({
      where: { id },
      include: {
        patient: {
          include: {
            user: {
              select: { fullName: true, phoneNumber: true, email: true },
            },
          },
        },
        doctor: {
          include: {
            user: {
              select: { fullName: true },
            },
          },
        },
        service: true,
        payment: true,
        consultation: {
          include: {
            prescription: {
              include: {
                items: true,
              },
            },
          },
        },
      },
    });

    if (!appointment) {
      throw new NotFoundException(`Appointment ${id} not found`);
    }

    return appointment;
  }

  async cancelAppointment(id: string, userId: string, reason?: string) {
    const appointment = await this.prisma.appointment.findUnique({
      where: { id },
    });

    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }

    const updated = await this.prisma.appointment.update({
      where: { id },
      data: {
        status: AppointmentStatus.CANCELLED,
      },
    });

    await this.prisma.auditLog.create({
      data: {
        actorUserId: userId,
        action: 'APPOINTMENT_CANCELLED',
        resource: 'APPOINTMENT',
        resourceId: id,
        ipAddress: '127.0.0.1',
        userAgent: 'DermaCare API',
        metadata: { reason },
      },
    });

    return updated;
  }
}

