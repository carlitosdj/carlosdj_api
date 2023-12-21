import { Controller, Post, Body } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { SkipAuth } from 'src/auth/auth.public.decorator';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @SkipAuth()
  @Post('order')
  order(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentService.createOrder(createPaymentDto);
  }

  @SkipAuth()
  @Post('webhook')
  webhook(@Body() webHook: any) {
    return this.paymentService.webHook(webHook);
  }
}
