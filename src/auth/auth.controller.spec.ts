import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth.constants';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { DB_SERVICE } from '../drizzle/providers/drizzle.providers';
import { MailModule } from '../mail/mail.module';
import { UserModule } from '../user/user.module';
import { MailService } from '../mail/mail.service';
import { MailerModule, MailerService } from '@nestjs-modules/mailer';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          global: true,
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '7d' },
        }),
        MailModule,
      ],

      controllers: [AuthController],
      providers: [
        AuthService,
        UserService,
        {
          provide: APP_GUARD,
          useClass: AuthGuard,
        },
        {
          provide: DB_SERVICE,
          useValue: {
            get: jest.fn(),
          }
        }
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
