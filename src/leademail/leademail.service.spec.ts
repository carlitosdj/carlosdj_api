import { Test, TestingModule } from '@nestjs/testing';
import { LeademailService } from './leademail.service';

describe('LeademailService', () => {
  let service: LeademailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LeademailService],
    }).compile();

    service = module.get<LeademailService>(LeademailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
