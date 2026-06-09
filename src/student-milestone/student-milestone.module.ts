import { Module } from '@nestjs/common';
import { StudentMilestoneService } from './student-milestone.service';
import { StudentMilestoneController } from './student-milestone.controller';

@Module({
  controllers: [StudentMilestoneController],
  providers: [StudentMilestoneService],
})
export class StudentMilestoneModule {}
