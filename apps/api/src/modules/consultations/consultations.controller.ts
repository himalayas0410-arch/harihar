import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { ConsultationsService, SaveConsultationDto } from './consultations.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { UserRole } from '@prisma/client';

@Controller('consultations')
@UseGuards(JwtAuthGuard)
export class ConsultationsController {
  constructor(private readonly consultationsService: ConsultationsService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles(UserRole.DOCTOR, UserRole.ADMIN)
  saveConsultation(
    @Body() dto: SaveConsultationDto,
    @CurrentUser('id') userId: string,
    @CurrentUser('doctorId') doctorId: string,
  ) {
    return this.consultationsService.saveConsultation(
      { ...dto, doctorId: dto.doctorId || doctorId },
      userId,
    );
  }

  @Get('appointment/:appointmentId')
  getByAppointment(@Param('appointmentId') appointmentId: string) {
    return this.consultationsService.getConsultationByAppointment(appointmentId);
  }
}
