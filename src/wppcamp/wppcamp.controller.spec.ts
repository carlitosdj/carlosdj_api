import { Test, TestingModule } from '@nestjs/testing';
import { WppcampController } from './wppcamp.controller';
import { WppcampService } from './wppcamp.service';

describe('WppcampController', () => {
  let controller: WppcampController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WppcampController],
      providers: [WppcampService],
    }).compile();

    controller = module.get<WppcampController>(WppcampController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
