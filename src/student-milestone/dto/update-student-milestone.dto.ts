import { PartialType } from '@nestjs/mapped-types';
import { CreateStudentMilestoneDto } from './create-student-milestone.dto';

export class UpdateStudentMilestoneDto extends PartialType(CreateStudentMilestoneDto) {}
