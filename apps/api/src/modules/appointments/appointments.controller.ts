import { Controller, Post, Get, Body, Param, Query, UseGuards } from '@nestjs/common';
import { AppointmentsService, ReserveSlotDto } from './appointments.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { UserRole } from '@prisma/client';

@Controller('appointments')
@UseGuards(JwtAuthGuard)
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post('reserve')
  reserveSlot(
    @Body() dto: ReserveSlotDto,
    @CurrentUser('id') userId: string,
    @CurrentUser('patientId') patientId: string,
  ) {
    return this.appointmentsService.reserveSlot(
      { ...dto, patientId: dto.patientId || patientId },
      userId,
    );
  }

  @Get('my')
  getMyPatientAppointments(@CurrentUser('patientId') patientId: string) {
    return this.appointmentsService.getPatientAppointments(patientId);
  }

  @Get('doctor-schedule')
  @UseGuards(RolesGuard)
  @Roles(UserRole.DOCTOR, UserRole.ADMIN)
  getDoctorAppointments(
    @CurrentUser('doctorId') doctorId: string,
    @Query('date') date?: string,
  ) {
    return this.appointmentsService.getDoctorAppointments(doctorId, date);
  }

  @Get(':id')
  getAppointment(@Param('id') id: string) {
    return this.appointmentsService.getAppointmentById(id);
  }

  @Post(':id/cancel')
  cancelAppointment(
    @Param('id') id: string,
    @CurrentUser('id') userId: string,
    @Body('reason') reason?: string,
  ) {
    return this.appointmentsService.cancelAppointment(id, userId, reason);
  }
}
