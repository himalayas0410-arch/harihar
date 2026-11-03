import { Controller, Post, Get, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { RecordsService, CreateRecordDto } from './records.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { MedicalRecordType } from '@prisma/client';

@Controller('records')
@UseGuards(JwtAuthGuard)
export class RecordsController {
  constructor(private readonly recordsService: RecordsService) {}

  @Post('upload-request')
  getUploadUrl(
    @Body() dto: CreateRecordDto,
    @CurrentUser('id') userId: string,
    @CurrentUser('patientId') patientId: string,
  ) {
    return this.recordsService.getUploadUrl(
      { ...dto, patientId: dto.patientId || patientId },
      userId,
    );
  }

  @Get('patient/:patientId')
  getPatientRecords(
    @Param('patientId') patientId: string,
    @Query('type') type?: MedicalRecordType,
  ) {
    return this.recordsService.getPatientRecords(patientId, type);
  }

  @Delete(':id')
  deleteRecord(@Param('id') id: string, @CurrentUser() user: any) {
    return this.recordsService.deleteRecord(id, user);
  }
}
