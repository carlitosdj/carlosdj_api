import { Test, TestingModule } from '@nestjs/testing';
import { WppgroupService } from './wppgroup.service';

describe('WppgroupService', () => {
  let service: WppgroupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WppgroupService],
    }).compile();

    service = module.get<WppgroupService>(WppgroupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
