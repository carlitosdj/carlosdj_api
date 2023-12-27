import { Test, TestingModule } from '@nestjs/testing';
import { PaymentService } from './payment.service';
import { HttpModule, HttpService } from '@nestjs/axios';
import { EventEmitter2 } from '@nestjs/event-emitter';

describe('PaymentService', () => {
  let service: PaymentService;

  beforeEach(async () => { 
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [PaymentService, EventEmitter2],
    }).compile();

    service = module.get<PaymentService>(PaymentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
