import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StudentMilestoneService } from './student-milestone.service';
import { CreateStudentMilestoneDto } from './dto/create-student-milestone.dto';
import { UpdateStudentMilestoneDto } from './dto/update-student-milestone.dto';

@Controller('student-milestone')
export class StudentMilestoneController {
  constructor(private readonly studentMilestoneService: StudentMilestoneService) {}

  @Post()
  create(@Body() createStudentMilestoneDto: CreateStudentMilestoneDto) {
    return this.studentMilestoneService.create(createStudentMilestoneDto);
  }

  @Get()
  findAll() {
    return this.studentMilestoneService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentMilestoneService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentMilestoneDto: UpdateStudentMilestoneDto) {
    return this.studentMilestoneService.update(+id, updateStudentMilestoneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentMilestoneService.remove(+id);
  }
}
