import { Test, TestingModule } from '@nestjs/testing';
import { ComponentaccessService } from './componentaccess.service';

describe('ComponentaccessService', () => {
  let service: ComponentaccessService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ComponentaccessService],
    }).compile();

    service = module.get<ComponentaccessService>(ComponentaccessService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
