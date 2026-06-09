import { Injectable } from '@nestjs/common';
import { CreateStudentMilestoneDto } from './dto/create-student-milestone.dto';
import { UpdateStudentMilestoneDto } from './dto/update-student-milestone.dto';

@Injectable()
export class StudentMilestoneService {
  create(createStudentMilestoneDto: CreateStudentMilestoneDto) {
    return 'This action adds a new studentMilestone';
  }

  findAll() {
    return `This action returns all studentMilestone`;
  }

  findOne(id: number) {
    return `This action returns a #${id} studentMilestone`;
  }

  update(id: number, updateStudentMilestoneDto: UpdateStudentMilestoneDto) {
    return `This action updates a #${id} studentMilestone`;
  }

  remove(id: number) {
    return `This action removes a #${id} studentMilestone`;
  }
}
