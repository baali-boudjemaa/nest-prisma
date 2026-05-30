import { Test, TestingModule } from '@nestjs/testing';
import { StudentMilestoneController } from './student-milestone.controller';
import { StudentMilestoneService } from './student-milestone.service';

describe('StudentMilestoneController', () => {
  let controller: StudentMilestoneController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentMilestoneController],
      providers: [StudentMilestoneService],
    }).compile();

    controller = module.get<StudentMilestoneController>(StudentMilestoneController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
