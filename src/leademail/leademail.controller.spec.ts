import { Test, TestingModule } from '@nestjs/testing';
import { LeademailController } from './leademail.controller';
import { LeademailService } from './leademail.service';

describe('LeademailController', () => {
  let controller: LeademailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LeademailController],
      providers: [LeademailService],
    }).compile();

    controller = module.get<LeademailController>(LeademailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
