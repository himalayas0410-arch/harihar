import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AuditService {
  constructor(private prisma: PrismaService) {}

  async logAction(data: {
    actorUserId?: string;
    action: string;
    resource: string;
    resourceId?: string;
    ipAddress?: string;
    userAgent?: string;
    metadata?: any;
  }) {
    return this.prisma.auditLog.create({
      data: {
        actorUserId: data.actorUserId,
        action: data.action,
        resource: data.resource,
        resourceId: data.resourceId,
        ipAddress: data.ipAddress || '127.0.0.1',
        userAgent: data.userAgent || 'Unknown',
        metadata: data.metadata,
      },
    });
  }

  async getRecentLogs(limit = 50) {
    return this.prisma.auditLog.findMany({
      take: limit,
      orderBy: { timestamp: 'desc' },
      include: {
        actorUser: {
          select: { fullName: true, role: true, email: true },
        },
      },
    });
  }
}
