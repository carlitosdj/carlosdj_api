import { Test, TestingModule } from '@nestjs/testing';
import { ComponentannotationController } from './componentannotation.controller';
import { ComponentannotationService } from './componentannotation.service';
import { DB_SERVICE } from '../drizzle/providers/drizzle.providers';

describe('ComponentannotationController', () => {
  let controller: ComponentannotationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ComponentannotationController],
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

    controller = module.get<ComponentannotationController>(
      ComponentannotationController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
