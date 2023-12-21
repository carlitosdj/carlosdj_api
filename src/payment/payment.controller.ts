import { Controller, Post, Body, Sse } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { SkipAuth } from 'src/auth/auth.public.decorator';
import { Observable, fromEvent, interval, map } from 'rxjs';
//import { EventEmitter2 } from '@nestjs/event-emitter';

const NEW_ORDER_EVENT_NAME = 'new-order';

export interface MessageEvent {
  data: string | object;
  id?: string;
  type?: string;
  retry?: number;
}

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

  @Sse('sse')
  sse(): Observable<MessageEvent> {
    return interval(1000).pipe(map((_) => ({ data: { hello: 'world' } })));
  }
}
