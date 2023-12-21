import { Controller, Post, Body, Sse } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { SkipAuth } from 'src/auth/auth.public.decorator';
import { Observable, fromEvent, interval, map } from 'rxjs';
import { EventEmitter2 } from '@nestjs/event-emitter';
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
  constructor(
    private readonly paymentService: PaymentService, 
    private eventEmitter: EventEmitter2) {}

  @SkipAuth()
  @Post('order')
  order(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentService.createOrder(createPaymentDto);
  }

  @SkipAuth()
  @Post('webhook')
  webhook(@Body() webHook: any) {
    this.eventEmitter.emit('new-order');
    return this.paymentService.webHook(webHook);
  }

  @SkipAuth()
  @Sse('sse')
  sse(): Observable<MessageEvent> {
    return fromEvent(this.eventEmitter, 'new-order').pipe(
      map((data:any) => {
        console.log("DATA", data)
        return new MessageEvent('new-order', { data: 'new order' });
      }),
    );
  }
}
