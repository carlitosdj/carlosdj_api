import { Test, TestingModule } from '@nestjs/testing';
import { MassmailController } from './massmail.controller';
import { MassmailService } from './massmail.service';

describe('MassmailController', () => {
  let controller: MassmailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MassmailController],
      providers: [MassmailService],
    }).compile();

    controller = module.get<MassmailController>(MassmailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
