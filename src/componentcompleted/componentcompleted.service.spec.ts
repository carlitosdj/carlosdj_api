import { Test, TestingModule } from '@nestjs/testing';
import { ComponentcompletedService } from './componentcompleted.service';
import { DB_SERVICE } from '../drizzle/providers/drizzle.providers';

describe('ComponentcompletedService', () => {
  let service: ComponentcompletedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ComponentcompletedService,
        {
          provide: DB_SERVICE,
          useValue: {
            get: jest.fn(),
            //getClient: jest.fn().mockReturnValue(DB_SERVICE),
          },
        },
      ],
    }).compile();

    service = module.get<ComponentcompletedService>(ComponentcompletedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
