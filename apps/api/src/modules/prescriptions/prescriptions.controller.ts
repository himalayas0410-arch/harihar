import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { PrescriptionsService, CreatePrescriptionDto } from './prescriptions.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { UserRole } from '@prisma/client';

@Controller('prescriptions')
@UseGuards(JwtAuthGuard)
export class PrescriptionsController {
  constructor(private readonly prescriptionsService: PrescriptionsService) {}

  @Post('draft')
  @UseGuards(RolesGuard)
  @Roles(UserRole.DOCTOR, UserRole.ADMIN)
  saveDraft(
    @Body() dto: CreatePrescriptionDto,
    @CurrentUser('id') userId: string,
    @CurrentUser('doctorId') doctorId: string,
  ) {
    return this.prescriptionsService.createOrUpdateDraft(
      { ...dto, doctorId: dto.doctorId || doctorId },
      userId,
    );
  }

  @Post(':id/approve')
  @UseGuards(RolesGuard)
  @Roles(UserRole.DOCTOR, UserRole.ADMIN)
  approve(
    @Param('id') id: string,
    @CurrentUser('doctorId') doctorId: string,
    @CurrentUser('id') userId: string,
  ) {
    return this.prescriptionsService.approvePrescription(id, doctorId, userId);
  }

  @Get('my-prescriptions')
  getMyPrescriptions(@CurrentUser('patientId') patientId: string) {
    return this.prescriptionsService.getPatientPrescriptionHistory(patientId);
  }

  @Get(':id')
  getPrescription(
    @Param('id') id: string,
    @CurrentUser() user: any,
  ) {
    return this.prescriptionsService.getPrescriptionById(id, user);
  }
}
