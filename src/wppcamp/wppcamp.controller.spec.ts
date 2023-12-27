import { Test, TestingModule } from '@nestjs/testing';
import { WppcampController } from './wppcamp.controller';
import { WppcampService } from './wppcamp.service';
import { DB_SERVICE } from '../drizzle/providers/drizzle.providers';

describe('WppcampController', () => {
  let controller: WppcampController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WppcampController],
      providers: [
        WppcampService,
        {
          provide: DB_SERVICE,
          useValue: {
            get: jest.fn(),
            //getClient: jest.fn().mockReturnValue(DB_SERVICE),
          },
        },
      ],
    }).compile();

    controller = module.get<WppcampController>(WppcampController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
