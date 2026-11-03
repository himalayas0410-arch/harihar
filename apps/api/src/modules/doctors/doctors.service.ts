import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class DoctorsService {
  constructor(private prisma: PrismaService) {}

  async getPublicDoctorProfile() {
    const doctor = await this.prisma.doctor.findFirst({
      include: {
        user: {
          select: {
            fullName: true,
            email: true,
            phoneNumber: true,
          },
        },
        availabilities: {
          where: { isAvailable: true },
          orderBy: [{ dayOfWeek: 'asc' }, { startTime: 'asc' }],
        },
      },
    });

    if (!doctor) {
      throw new NotFoundException('Doctor profile not found. Please run database seed.');
    }

    return {
      id: doctor.id,
      fullName: doctor.user.fullName,
      email: doctor.user.email,
      nmcRegistrationNumber: doctor.nmcRegistrationNumber,
      stateMedicalCouncil: doctor.stateMedicalCouncil,
      qualificationString: doctor.qualificationString,
      specialties: doctor.specialties,
      bio: doctor.bio,
      experienceYears: doctor.experienceYears,
      consultationFeePaise: doctor.consultationFeePaise,
      profileImageUrl: doctor.profileImageUrl,
      availabilities: doctor.availabilities,
    };
  }

  async getDoctorDashboardStats(doctorId: string) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const [todayCount, totalPatients, pendingPrescriptions, confirmedAppointments] = await Promise.all([
      this.prisma.appointment.count({
        where: {
          doctorId,
          slotStartTime: { gte: today, lt: tomorrow },
          status: 'CONFIRMED',
        },
      }),
      this.prisma.appointment.groupBy({
        by: ['patientId'],
        where: { doctorId },
      }),
      this.prisma.consultation.count({
        where: {
          doctorId,
          prescription: { is: null },
        },
      }),
      this.prisma.appointment.findMany({
        where: {
          doctorId,
          status: 'CONFIRMED',
          slotStartTime: { gte: today },
        },
        include: {
          patient: {
            include: {
              user: {
                select: { fullName: true, phoneNumber: true },
              },
            },
          },
          service: true,
        },
        orderBy: { slotStartTime: 'asc' },
        take: 10,
      }),
    ]);

    return {
      todayAppointmentsCount: todayCount,
      uniquePatientsCount: totalPatients.length,
      pendingPrescriptionsCount: pendingPrescriptions,
      upcomingAppointments: confirmedAppointments,
    };
  }
}

