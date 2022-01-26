import { Test, TestingModule } from '@nestjs/testing';
import { TimedController } from './timed.controller';

describe('TimedController', () => {
  let controller: TimedController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TimedController],
    }).compile();

    controller = module.get<TimedController>(TimedController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
