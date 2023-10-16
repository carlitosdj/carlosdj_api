import { Test, TestingModule } from '@nestjs/testing';
import { MassmailService } from './massmail.service';

describe('MassmailService', () => {
  let service: MassmailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MassmailService],
    }).compile();

    service = module.get<MassmailService>(MassmailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
