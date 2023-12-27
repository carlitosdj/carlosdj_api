import { Test, TestingModule } from '@nestjs/testing';
import { WppgroupService } from './wppgroup.service';
import { DB_SERVICE } from '../drizzle/providers/drizzle.providers';

describe('WppgroupService', () => {
  let service: WppgroupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WppgroupService,
        {
          provide: DB_SERVICE,
          useValue: {
            get: jest.fn(),
            //getClient: jest.fn().mockReturnValue(DB_SERVICE),
          },
        },
      ],
    }).compile();

    service = module.get<WppgroupService>(WppgroupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
