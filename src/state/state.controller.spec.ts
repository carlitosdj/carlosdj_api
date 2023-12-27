import { Test, TestingModule } from '@nestjs/testing';
import { StateController } from './state.controller';
import { StateService } from './state.service';
import { DB_SERVICE } from '../drizzle/providers/drizzle.providers';

describe('StateController', () => {
  let controller: StateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StateController],
      providers: [
        StateService,
        {
          provide: DB_SERVICE,
          useValue: {
            get: jest.fn(),
            //getClient: jest.fn().mockReturnValue(DB_SERVICE),
          },
        },
      ],
    }).compile();

    controller = module.get<StateController>(StateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
