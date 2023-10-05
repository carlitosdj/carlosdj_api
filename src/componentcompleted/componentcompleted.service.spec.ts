import { Test, TestingModule } from '@nestjs/testing';
import { ComponentcompletedService } from './componentcompleted.service';

describe('ComponentcompletedService', () => {
  let service: ComponentcompletedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ComponentcompletedService],
    }).compile();

    service = module.get<ComponentcompletedService>(ComponentcompletedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
