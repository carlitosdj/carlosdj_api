import { Test, TestingModule } from '@nestjs/testing';
import { WppcampService } from './wppcamp.service';

describe('WppcampService', () => {
  let service: WppcampService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WppcampService],
    }).compile();

    service = module.get<WppcampService>(WppcampService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
