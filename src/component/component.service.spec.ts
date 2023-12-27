import { Test, TestingModule } from '@nestjs/testing';
import { ComponentService } from './component.service';
import { DB_SERVICE } from '../drizzle/providers/drizzle.providers';

describe('ComponentService', () => {
  let service: ComponentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ComponentService,
        {
          provide: DB_SERVICE,
          useValue: {
            get: jest.fn(),
            //getClient: jest.fn().mockReturnValue(DB_SERVICE),
          },
        },
      ],
    }).compile();

    service = module.get<ComponentService>(ComponentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
