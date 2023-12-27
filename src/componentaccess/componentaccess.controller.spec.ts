import { Test, TestingModule } from '@nestjs/testing';
import { ComponentaccessController } from './componentaccess.controller';
import { ComponentaccessService } from './componentaccess.service';
import { DB_SERVICE } from '../drizzle/providers/drizzle.providers';

describe('ComponentaccessController', () => {
  let controller: ComponentaccessController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ComponentaccessController],
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

    controller = module.get<ComponentaccessController>(
      ComponentaccessController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
