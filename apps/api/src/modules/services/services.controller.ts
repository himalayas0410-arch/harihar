import { Controller, Get, Param } from '@nestjs/common';
import { ServicesService } from './services.service';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Get()
  getAllServices() {
    return this.servicesService.getAllActiveServices();
  }

  @Get(':slug')
  getService(@Param('slug') slug: string) {
    return this.servicesService.getServiceBySlug(slug);
  }
}

