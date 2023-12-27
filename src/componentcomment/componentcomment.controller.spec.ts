import { Test, TestingModule } from '@nestjs/testing';
import { ComponentcommentController } from './componentcomment.controller';
import { ComponentcommentService } from './componentcomment.service';
import { DB_SERVICE } from '../drizzle/providers/drizzle.providers';

describe('ComponentcommentController', () => {
  let controller: ComponentcommentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ComponentcommentController],
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

    controller = module.get<ComponentcommentController>(
      ComponentcommentController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
