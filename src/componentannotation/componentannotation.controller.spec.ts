import { Test, TestingModule } from '@nestjs/testing';
import { ComponentannotationController } from './componentannotation.controller';
import { ComponentannotationService } from './componentannotation.service';

describe('ComponentannotationController', () => {
  let controller: ComponentannotationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ComponentannotationController],
      providers: [ComponentannotationService],
    }).compile();

    controller = module.get<ComponentannotationController>(ComponentannotationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
