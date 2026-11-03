import { Controller, Get, Query } from '@nestjs/common';
import { AvailabilityService } from './availability.service';

@Controller('availability')
export class AvailabilityController {
  constructor(private readonly availabilityService: AvailabilityService) {}

  @Get('slots')
  getSlots(
    @Query('date') date: string,
    @Query('doctorId') doctorId?: string,
  ) {
    return this.availabilityService.getAvailableSlots(date, doctorId);
  }
}

