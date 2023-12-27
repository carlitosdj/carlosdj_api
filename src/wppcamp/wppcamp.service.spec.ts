import { Test, TestingModule } from '@nestjs/testing';
import { WppcampService } from './wppcamp.service';
import { DB_SERVICE } from '../drizzle/providers/drizzle.providers';

describe('WppcampService', () => {
  let service: WppcampService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WppcampService,
        {
          provide: DB_SERVICE,
          useValue: {
            get: jest.fn(),
            //getClient: jest.fn().mockReturnValue(DB_SERVICE),
          },
        },
      ],
    }).compile();

    service = module.get<WppcampService>(WppcampService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
