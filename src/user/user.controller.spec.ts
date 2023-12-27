import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DB_SERVICE } from '../drizzle/providers/drizzle.providers';
import { MailModule } from '../mail/mail.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '../auth/auth.guard';
import { AuthModule } from '../auth/auth.module';
import { forwardRef } from '@nestjs/common';
import { RolesBuilder } from 'nest-access-control';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports:[MailModule],
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: DB_SERVICE,
          useValue: {
            get: jest.fn(),
          },
        },
        // {
        //   provide: APP_GUARD,
        //   useClass: AuthGuard,
        // },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
