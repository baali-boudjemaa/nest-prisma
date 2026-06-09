import { Test, TestingModule } from '@nestjs/testing';
import { StudentMilestoneService } from './student-milestone.service';

describe('StudentMilestoneService', () => {
  let service: StudentMilestoneService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudentMilestoneService],
    }).compile();

    service = module.get<StudentMilestoneService>(StudentMilestoneService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
