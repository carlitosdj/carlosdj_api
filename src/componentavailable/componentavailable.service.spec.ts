import { Test, TestingModule } from '@nestjs/testing';
import { ComponentavailableService } from './componentavailable.service';

describe('ComponentavailableService', () => {
  let service: ComponentavailableService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ComponentavailableService],
    }).compile();

    service = module.get<ComponentavailableService>(ComponentavailableService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
