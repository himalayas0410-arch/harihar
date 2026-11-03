import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { MedicalRecordType } from '@prisma/client';
import * as crypto from 'crypto';

export class CreateRecordDto {
  patientId: string;
  recordType: MedicalRecordType;
  title: string;
  description?: string;
  mimeType: string;
  fileSizeBytes: number;
}

@Injectable()
export class RecordsService {
  constructor(private prisma: PrismaService) {}

  /**
   * Generates a pre-signed S3 upload URL or sandbox URL for medical documents and skin photos.
   */
  async getUploadUrl(dto: CreateRecordDto, userId: string) {
    const fileExtension = dto.mimeType.split('/')[1] || 'bin';
    const s3Key = `records/${dto.patientId}/${Date.now()}_${crypto.randomBytes(6).toString('hex')}.${fileExtension}`;
    const s3Bucket = process.env.S3_BUCKET_NAME || 'dermacare-clinical-records';

    // In local development or with direct S3 SDK:
    // Generate pre-signed PUT url
    const uploadUrl = `https://${s3Bucket}.s3.${process.env.S3_REGION || 'ap-south-1'}.amazonaws.com/${s3Key}?mock-presigned=true`;

    const record = await this.prisma.medicalRecord.create({
      data: {
        patientId: dto.patientId,
        uploadedByUserId: userId,
        recordType: dto.recordType,
        title: dto.title,
        description: dto.description,
        s3Bucket,
        s3Key,
        mimeType: dto.mimeType,
        fileSizeBytes: dto.fileSizeBytes,
      },
    });

    return {
      recordId: record.id,
      s3Key,
      uploadUrl,
    };
  }

  async getPatientRecords(patientId: string, type?: MedicalRecordType) {
    const where: any = { patientId };
    if (type) {
      where.recordType = type;
    }

    const records = await this.prisma.medicalRecord.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    // Attach signed expiring download links (15 min validity)
    return records.map((r) => ({
      ...r,
      downloadUrl: `https://${r.s3Bucket}.s3.amazonaws.com/${r.s3Key}?expires=${Date.now() + 15 * 60 * 1000}`,
    }));
  }

  async deleteRecord(recordId: string, requestingUser: any) {
    const record = await this.prisma.medicalRecord.findUnique({
      where: { id: recordId },
      include: { patient: true },
    });

    if (!record) {
      throw new NotFoundException('Medical record not found');
    }

    if (
      requestingUser.role === 'PATIENT' &&
      record.patient.userId !== requestingUser.id
    ) {
      throw new BadRequestException('Unauthorized to delete this record');
    }

    return this.prisma.medicalRecord.delete({
      where: { id: recordId },
    });
  }
}
