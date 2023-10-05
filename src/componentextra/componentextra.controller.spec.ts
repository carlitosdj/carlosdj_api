import { Test, TestingModule } from '@nestjs/testing';
import { ComponentextraController } from './componentextra.controller';
import { ComponentextraService } from './componentextra.service';

describe('ComponentextraController', () => {
  let controller: ComponentextraController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ComponentextraController],
      providers: [ComponentextraService],
    }).compile();

    controller = module.get<ComponentextraController>(ComponentextraController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
