import { Test, TestingModule } from '@nestjs/testing';
import { ComponentaccessService } from './componentaccess.service';
import { DB_SERVICE } from '../drizzle/providers/drizzle.providers';

describe('ComponentaccessService', () => {
  let service: ComponentaccessService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ComponentaccessService,
        {
          provide: DB_SERVICE,
          useValue: {
            get: jest.fn(),
            //getClient: jest.fn().mockReturnValue(DB_SERVICE),
          },
        },
      ],
    }).compile();

    service = module.get<ComponentaccessService>(ComponentaccessService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
