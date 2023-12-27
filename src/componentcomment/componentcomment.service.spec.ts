import { Test, TestingModule } from '@nestjs/testing';
import { ComponentcommentService } from './componentcomment.service';
import { DB_SERVICE } from '../drizzle/providers/drizzle.providers';

describe('ComponentcommentService', () => {
  let service: ComponentcommentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ComponentcommentService,
        {
          provide: DB_SERVICE,
          useValue: {
            get: jest.fn(),
            //getClient: jest.fn().mockReturnValue(DB_SERVICE),
          },
        },
      ],
    }).compile();

    service = module.get<ComponentcommentService>(ComponentcommentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
