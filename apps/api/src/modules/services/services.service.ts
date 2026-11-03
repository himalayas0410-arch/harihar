import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ServicesService {
  constructor(private prisma: PrismaService) {}

  async getAllActiveServices() {
    return this.prisma.service.findMany({
      where: { isActive: true },
      orderBy: { priceInPaise: 'asc' },
    });
  }

  async getServiceBySlug(slug: string) {
    const service = await this.prisma.service.findUnique({
      where: { slug },
    });
    if (!service) {
      throw new NotFoundException(`Dermatology service '${slug}' not found`);
    }
    return service;
  }
}

