import { Injectable } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { PrismaService } from '../prisma/prisma.service';
@Injectable()
export class TeacherService {
  constructor(private readonly prisma: PrismaService) {}

  create(createTeacherDto: CreateTeacherDto) {
    return this.prisma.teacher.create({
      data: {
        firstName: createTeacherDto.firstName,
        lastName: createTeacherDto.lastName,
        phoneNumber: createTeacherDto.phoneNumber,
        email: createTeacherDto.email,
        certifications: createTeacherDto.certifications,
      },
    });
  }

  findAll() {
    return this.prisma.teacher.findMany();
  }

  findOne(id: string) {
    return this.prisma.teacher.findUnique({
      where: { id },
    });
  }

  update(id: string, updateTeacherDto: UpdateTeacherDto) {
    return this.prisma.teacher.update({
      where: { id },
      data: {
        firstName: updateTeacherDto.firstName,
        lastName: updateTeacherDto.lastName,
        phoneNumber: updateTeacherDto.phoneNumber,
        email: updateTeacherDto.email,
        certifications: updateTeacherDto.certifications,
      },
    });
  }

  remove(id: string) {
    return this.prisma.teacher.delete({
      where: { id },
    });
  }
}
