import { Controller, Post, Body, UseGuards, Headers, Req } from '@nestjs/common';
import { PaymentsService, CreatePaymentOrderDto, VerifyPaymentDto } from './payments.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('create-order')
  @UseGuards(JwtAuthGuard)
  createOrder(@Body() dto: CreatePaymentOrderDto) {
    return this.paymentsService.createOrder(dto);
  }

  @Post('verify')
  @UseGuards(JwtAuthGuard)
  verifyPayment(
    @Body() dto: VerifyPaymentDto,
    @CurrentUser('id') userId: string,
  ) {
    return this.paymentsService.verifyPayment(dto, userId);
  }

  @Post('webhook')
  handleWebhook(
    @Headers('x-razorpay-signature') signature: string,
    @Req() req: any,
    @Body() payload: any,
  ) {
    const rawBody = typeof req.rawBody === 'string' ? req.rawBody : JSON.stringify(payload);
    return this.paymentsService.handleWebhook(rawBody, signature, payload);
  }
}
