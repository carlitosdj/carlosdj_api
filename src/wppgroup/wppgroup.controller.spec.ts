import { Test, TestingModule } from '@nestjs/testing';
import { WppgroupController } from './wppgroup.controller';
import { WppgroupService } from './wppgroup.service';

describe('WppgroupController', () => {
  let controller: WppgroupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WppgroupController],
      providers: [WppgroupService],
    }).compile();

    controller = module.get<WppgroupController>(WppgroupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
