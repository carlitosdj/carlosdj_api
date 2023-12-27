import { Test, TestingModule } from '@nestjs/testing';
import { LeadService } from './lead.service';
import { DB_SERVICE } from '../drizzle/providers/drizzle.providers';
import { SchedulerRegistry } from '@nestjs/schedule';
import { MailModule } from '../mail/mail.module';

describe('LeadService', () => {
  let service: LeadService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MailModule],
      providers: [
        LeadService,
        {
          provide: DB_SERVICE,
          useValue: {
            get: jest.fn(),
            //getClient: jest.fn().mockReturnValue(DB_SERVICE),
          },
        },
        {
          provide: SchedulerRegistry,
          useValue: {
            get: jest.fn(),
            //getClient: jest.fn().mockReturnValue(DB_SERVICE),
          },
        },
      ],
    }).compile();

    service = module.get<LeadService>(LeadService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
