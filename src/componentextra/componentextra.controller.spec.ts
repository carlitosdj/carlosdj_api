import { Test, TestingModule } from '@nestjs/testing';
import { ComponentextraController } from './componentextra.controller';
import { ComponentextraService } from './componentextra.service';
import { DB_SERVICE } from '../drizzle/providers/drizzle.providers';

describe('ComponentextraController', () => {
  let controller: ComponentextraController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ComponentextraController],
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

    controller = module.get<ComponentextraController>(ComponentextraController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
