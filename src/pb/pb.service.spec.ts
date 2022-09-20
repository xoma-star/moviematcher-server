import { Test, TestingModule } from '@nestjs/testing';
import { PbService } from './pb.service';

describe('PbService', () => {
  let service: PbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PbService],
    }).compile();

    service = module.get<PbService>(PbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
