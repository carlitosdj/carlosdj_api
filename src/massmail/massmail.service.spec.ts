import { Test, TestingModule } from '@nestjs/testing';
import { MassmailService } from './massmail.service';
import { DB_SERVICE } from '../drizzle/providers/drizzle.providers';
import { MailModule } from '../mail/mail.module';

describe('MassmailService', () => {
  let service: MassmailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MailModule],
      providers: [
        MassmailService,
        {
          provide: DB_SERVICE,
          useValue: {
            get: jest.fn(),
            //getClient: jest.fn().mockReturnValue(DB_SERVICE),
          },
        },
      ],
    }).compile();

    service = module.get<MassmailService>(MassmailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
