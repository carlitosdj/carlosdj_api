import { Controller, Post, Body, Sse } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { SkipAuth } from '../auth/auth.public.decorator';
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
    private eventEmitter: EventEmitter2,
  ) {}

  @SkipAuth()
  @Post('order')
  order(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentService.createOrder(createPaymentDto);
  }

  @SkipAuth()
  @Sse('sse')
  public sse(): Observable<MessageEvent> {
    //return interval(5000).pipe(map((_) => ({ data: { hello: 'world' } })));
    return fromEvent(this.eventEmitter, NEW_ORDER_EVENT_NAME).pipe(
      map((data: any) => {
        console.log('DATA', data.data.id);
        //return new MessageEvent('new-order', { data: data });
        return { data } as MessageEvent;
      }),
    );
  }

  @SkipAuth()
  @Post('webhook')
  webhook(@Body() webHook: any) {
    this.eventEmitter.emit(NEW_ORDER_EVENT_NAME, webHook);
    return this.paymentService.webHook(webHook);
  }
}
