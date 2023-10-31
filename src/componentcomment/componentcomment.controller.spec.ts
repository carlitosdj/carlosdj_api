import { Test, TestingModule } from '@nestjs/testing';
import { ComponentcommentController } from './componentcomment.controller';
import { ComponentcommentService } from './componentcomment.service';

describe('ComponentcommentController', () => {
  let controller: ComponentcommentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ComponentcommentController],
      providers: [ComponentcommentService],
    }).compile();

    controller = module.get<ComponentcommentController>(ComponentcommentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
