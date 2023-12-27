import { Test, TestingModule } from '@nestjs/testing';
import { MassmailController } from './massmail.controller';
import { MassmailService } from './massmail.service';
import { DB_SERVICE } from '../drizzle/providers/drizzle.providers';
import { MailService } from '../mail/mail.service';
import { MailModule } from '../mail/mail.module';

describe('MassmailController', () => {
  let controller: MassmailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MailModule],
      controllers: [MassmailController],
      providers: [
        MassmailService,
        {
          provide: DB_SERVICE,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<MassmailController>(MassmailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
