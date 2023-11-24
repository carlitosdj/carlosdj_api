import { Test, TestingModule } from '@nestjs/testing';
import { ComponentaccessController } from './componentaccess.controller';
import { ComponentaccessService } from './componentaccess.service';

describe('ComponentaccessController', () => {
  let controller: ComponentaccessController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ComponentaccessController],
      providers: [ComponentaccessService],
    }).compile();

    controller = module.get<ComponentaccessController>(ComponentaccessController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
