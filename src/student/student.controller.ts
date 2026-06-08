import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Public } from '../auth/decorators/decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { StudentService } from './student.service';
import { UserRole } from '../enums/UserRole';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) { }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(
    UserRole.SUPER_ADMIN,
    UserRole.ADMIN,
    UserRole.RECEPTIONIST,
  )
  @Post()
  create(@Body() createStudentDto: CreateStudentDto, @Req() req) {
    console.log('Received create student request with data:', createStudentDto);
    return this.studentService.create(createStudentDto);
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @UseGuards(AuthGuard, RolesGuard)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @Roles('ADMIN')
  @Get()
  findAll() {
    return this.studentService.findAll({ page: 1, limit: 10, search: '' })
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentService.findOne(id);
  }

  @Public()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentService.update(id, updateStudentDto);
  }

  @Public()
  @Post(':id/guardian/:guardianId')
  assignGuardian(
    @Param('id') studentId: string,
    @Param('guardianId') guardianId: string,
  ) {
    return this.studentService.assignExistingGuardian(studentId, guardianId);
  }

  @Public()
  @Delete(':id/guardian/:guardianId')
  removeGuardian(
    @Param('id') studentId: string,
    @Param('guardianId') guardianId: string,
  ) {
    return this.studentService.removeGuardian(studentId, guardianId);
  }

  @Public()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentService.remove(id);
  }
}
