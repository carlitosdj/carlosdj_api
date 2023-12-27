import { Test, TestingModule } from '@nestjs/testing';
import { ComponentextraService } from './componentextra.service';
import { DB_SERVICE } from '../drizzle/providers/drizzle.providers';

describe('ComponentextraService', () => {
  let service: ComponentextraService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ComponentextraService,
        {
          provide: DB_SERVICE,
          useValue: {
            get: jest.fn(),
            //getClient: jest.fn().mockReturnValue(DB_SERVICE),
          },
        },
      ],
    }).compile();

    service = module.get<ComponentextraService>(ComponentextraService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
