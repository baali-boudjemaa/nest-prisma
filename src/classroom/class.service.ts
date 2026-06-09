/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateClassroomDto } from './dto/create-class.dto';
import { UpdateClassroomDto } from './dto/update-class.dto';

@Injectable()
export class ClassService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createClassroomDto: CreateClassroomDto) {
    const classroomData = {
      name: createClassroomDto.name,
      ageGroup: createClassroomDto.ageGroup ?? undefined,
      capacity: createClassroomDto.capacity,
      type: createClassroomDto.type,
    };

    return this.prisma.classroom.create({
      data: classroomData,
    });
  }

  findAll() {
    return this.prisma.classroom.findMany({
      include: {

        inscriptions: true,
      },
    });
  }

  async findOne(id: string) {
    const classroom = await this.prisma.classroom.findUnique({
      where: { id },
      include: {
        inscriptions: true,
      },
    });

    if (!classroom) {
      throw new NotFoundException(`Classroom with id ${id} not found`);
    }

    return classroom;
  }

  async update(id: string, updateClassroomDto: UpdateClassroomDto) {
    await this.findOne(id);

    return this.prisma.classroom.update({
      where: { id },
      data: {
        name: updateClassroomDto.name,
        ageGroup: updateClassroomDto.ageGroup,
        capacity: updateClassroomDto.capacity,
        type: updateClassroomDto.type,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.classroom.delete({
      where: { id },
    });
  }
}
