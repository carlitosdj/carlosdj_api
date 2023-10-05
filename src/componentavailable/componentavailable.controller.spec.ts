import { Test, TestingModule } from '@nestjs/testing';
import { ComponentavailableController } from './componentavailable.controller';
import { ComponentavailableService } from './componentavailable.service';

describe('ComponentavailableController', () => {
  let controller: ComponentavailableController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ComponentavailableController],
      providers: [ComponentavailableService],
    }).compile();

    controller = module.get<ComponentavailableController>(ComponentavailableController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
