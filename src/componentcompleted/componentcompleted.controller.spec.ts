import { Test, TestingModule } from '@nestjs/testing';
import { ComponentcompletedController } from './componentcompleted.controller';
import { ComponentcompletedService } from './componentcompleted.service';

describe('ComponentcompletedController', () => {
  let controller: ComponentcompletedController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ComponentcompletedController],
      providers: [ComponentcompletedService],
    }).compile();

    controller = module.get<ComponentcompletedController>(ComponentcompletedController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
