import { Test, TestingModule } from '@nestjs/testing';
import { TimedService } from './timed.service';

describe('TimedService', () => {
  let service: TimedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TimedService],
    }).compile();

    service = module.get<TimedService>(TimedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
