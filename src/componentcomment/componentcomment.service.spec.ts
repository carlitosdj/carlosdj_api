import { Test, TestingModule } from '@nestjs/testing';
import { ComponentcommentService } from './componentcomment.service';

describe('ComponentcommentService', () => {
  let service: ComponentcommentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ComponentcommentService],
    }).compile();

    service = module.get<ComponentcommentService>(ComponentcommentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
