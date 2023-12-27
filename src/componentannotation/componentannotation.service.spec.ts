import { Test, TestingModule } from '@nestjs/testing';
import { ComponentannotationService } from './componentannotation.service';
import { DB_SERVICE } from '../drizzle/providers/drizzle.providers';

describe('ComponentannotationService', () => {
  let service: ComponentannotationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ComponentannotationService,
        {
          provide: DB_SERVICE,
          useValue: {
            get: jest.fn(),
            //getClient: jest.fn().mockReturnValue(DB_SERVICE),
          },
        },
      ],
    }).compile();

    service = module.get<ComponentannotationService>(
      ComponentannotationService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
