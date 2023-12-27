import { Test, TestingModule } from '@nestjs/testing';
import { LeadController } from './lead.controller';
import { LeadService } from './lead.service';
import { DB_SERVICE } from '../drizzle/providers/drizzle.providers';
// import { MailService } from '../mail/mail.service';
import { SchedulerRegistry } from '@nestjs/schedule';
import { MailModule } from '../mail/mail.module';

describe('LeadController', () => {
  let controller: LeadController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MailModule],
      controllers: [LeadController],
      providers: [
        LeadService,
        // MailService,
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

    controller = module.get<LeadController>(LeadController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
