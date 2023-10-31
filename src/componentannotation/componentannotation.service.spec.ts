import { Test, TestingModule } from '@nestjs/testing';
import { ComponentannotationService } from './componentannotation.service';

describe('ComponentannotationService', () => {
  let service: ComponentannotationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ComponentannotationService],
    }).compile();

    service = module.get<ComponentannotationService>(ComponentannotationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
