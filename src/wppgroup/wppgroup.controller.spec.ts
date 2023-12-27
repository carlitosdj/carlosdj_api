import { Test, TestingModule } from '@nestjs/testing';
import { WppgroupController } from './wppgroup.controller';
import { WppgroupService } from './wppgroup.service';
import { DB_SERVICE } from '../drizzle/providers/drizzle.providers';

describe('WppgroupController', () => {
  let controller: WppgroupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WppgroupController],
      providers: [
        WppgroupService,
        {
          provide: DB_SERVICE,
          useValue: {
            get: jest.fn(),
            //getClient: jest.fn().mockReturnValue(DB_SERVICE),
          },
        },
      ],
    }).compile();

    controller = module.get<WppgroupController>(WppgroupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
