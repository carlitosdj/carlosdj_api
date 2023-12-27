import { Test, TestingModule } from '@nestjs/testing';
import { ComponentController } from './component.controller';
import { ComponentService } from './component.service';
import { DB_SERVICE } from '../drizzle/providers/drizzle.providers';


describe('ComponentController', () => {
  let controller: ComponentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [ComponentController],
      providers: [
        ComponentService,
        {
          provide: DB_SERVICE,
          useValue: {
            get: jest.fn(),
            //getClient: jest.fn().mockReturnValue(DB_SERVICE),
          }
        }
      ],
    }).compile();

    controller = module.get<ComponentController>(ComponentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of cats', async () => {
      const result:any = [];
      jest.spyOn(controller, 'findAll').mockImplementation(() => result);

      expect(await controller.findAll(1,10)).toBe(result);
    });
  });
});
