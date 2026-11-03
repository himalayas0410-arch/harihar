import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AvailabilityService {
  constructor(private prisma: PrismaService) {}

  /**
   * Generates available time slots for a given date (YYYY-MM-DD) in Asia/Kolkata (IST).
   */
  async getAvailableSlots(dateStr: string, doctorId?: string) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
      throw new BadRequestException('Invalid date format. Use YYYY-MM-DD');
    }

    // Resolve doctor
    const doctor = doctorId
      ? await this.prisma.doctor.findUnique({ where: { id: doctorId } })
      : await this.prisma.doctor.findFirst();

    if (!doctor) {
      return [];
    }

    // Parse the given date in IST
    const [year, month, day] = dateStr.split('-').map(Number);
    // Day of week in JavaScript: 0 is Sunday, 1 is Monday...
    const dateObj = new Date(Date.UTC(year, month - 1, day, 0, 0, 0));
    // Calculate dayOfWeek in IST
    const istDate = new Date(`${dateStr}T00:00:00+05:30`);
    const dayOfWeek = istDate.getDay();

    // Query weekly availability rules for this day
    const availabilities = await this.prisma.availability.findMany({
      where: {
        doctorId: doctor.id,
        dayOfWeek,
        isAvailable: true,
      },
      orderBy: { startTime: 'asc' },
    });

    if (availabilities.length === 0) {
      return [];
    }

    // Determine query day start and end in UTC
    // IST is UTC+5:30. Day start in IST: 00:00 IST = previous day 18:30 UTC
    const dayStartUtc = new Date(Date.UTC(year, month - 1, day, 0, 0, 0) - 5.5 * 3600 * 1000);
    const dayEndUtc = new Date(dayStartUtc.getTime() + 24 * 3600 * 1000);

    // Fetch conflicting appointments for this doctor on this day
    const now = new Date();
    const existingAppointments = await this.prisma.appointment.findMany({
      where: {
        doctorId: doctor.id,
        slotStartTime: { gte: dayStartUtc, lt: dayEndUtc },
        OR: [
          { status: 'CONFIRMED' },
          {
            status: 'PENDING_PAYMENT',
            slotLockedUntil: { gt: now },
          },
        ],
      },
      select: {
        slotStartTime: true,
        slotEndTime: true,
      },
    });

    const slots: Array<{
      slotStartTime: string;
      slotEndTime: string;
      formattedTimeIST: string;
      isAvailable: boolean;
      dayOfWeek: number;
    }> = [];

    for (const rule of availabilities) {
      const [startHour, startMin] = rule.startTime.split(':').map(Number);
      const [endHour, endMin] = rule.endTime.split(':').map(Number);
      const durationMin = rule.slotDurationMinutes || 25;

      // Start time in IST
      let currentMinutes = startHour * 60 + startMin;
      const endMinutes = endHour * 60 + endMin;

      while (currentMinutes + durationMin <= endMinutes) {
        const slotStartHours = Math.floor(currentMinutes / 60);
        const slotStartMins = currentMinutes % 60;

        const slotEndHours = Math.floor((currentMinutes + durationMin) / 60);
        const slotEndMins = (currentMinutes + durationMin) % 60;

        // Construct slot timestamp in UTC
        // IST = UTC + 5:30 => UTC = IST - 5:30
        const slotStartUtc = new Date(
          Date.UTC(year, month - 1, day, slotStartHours, slotStartMins, 0) - 5.5 * 3600 * 1000,
        );
        const slotEndUtc = new Date(
          Date.UTC(year, month - 1, day, slotEndHours, slotEndMins, 0) - 5.5 * 3600 * 1000,
        );

        // Format IST representation
        const pad = (n: number) => String(n).padStart(2, '0');
        const formattedStartIST = `${pad(slotStartHours)}:${pad(slotStartMins)}`;
        const formattedEndIST = `${pad(slotEndHours)}:${pad(slotEndMins)}`;
        const formattedTimeIST = `${formattedStartIST} - ${formattedEndIST} IST`;

        // Check if slot is in the past
        const isPast = slotStartUtc.getTime() <= now.getTime();

        // Check collision with existing appointments
        const hasCollision = existingAppointments.some(
          (apt) =>
            apt.slotStartTime.getTime() < slotEndUtc.getTime() &&
            apt.slotEndTime.getTime() > slotStartUtc.getTime(),
        );

        const isAvailable = !isPast && !hasCollision;

        slots.push({
          slotStartTime: slotStartUtc.toISOString(),
          slotEndTime: slotEndUtc.toISOString(),
          formattedTimeIST,
          isAvailable,
          dayOfWeek,
        });

        currentMinutes += durationMin;
      }
    }

    return slots;
  }
}
