import { Test, TestingModule } from '@nestjs/testing';
import { ComponentcompletedController } from './componentcompleted.controller';
import { ComponentcompletedService } from './componentcompleted.service';
import { DB_SERVICE } from '../drizzle/providers/drizzle.providers';

describe('ComponentcompletedController', () => {
  let controller: ComponentcompletedController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ComponentcompletedController],
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

    controller = module.get<ComponentcompletedController>(
      ComponentcompletedController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
