import { Test, TestingModule } from '@nestjs/testing';
import { ComponentextraService } from './componentextra.service';

describe('ComponentextraService', () => {
  let service: ComponentextraService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ComponentextraService],
    }).compile();

    service = module.get<ComponentextraService>(ComponentextraService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
