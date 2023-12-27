import { Test, TestingModule } from '@nestjs/testing';
import { ComponentavailableController } from './componentavailable.controller';
import { ComponentavailableService } from './componentavailable.service';
import { DB_SERVICE } from '../drizzle/providers/drizzle.providers';

describe('ComponentavailableController', () => {
  let controller: ComponentavailableController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ComponentavailableController],
      providers: [
        ComponentavailableService,
        {
          provide: DB_SERVICE,
          useValue: {
            get: jest.fn(),
            //getClient: jest.fn().mockReturnValue(DB_SERVICE),
          },
        },
      ],
    }).compile();

    controller = module.get<ComponentavailableController>(
      ComponentavailableController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
