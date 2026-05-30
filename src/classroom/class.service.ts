import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';

@Injectable()
export class ClassService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createClassDto: CreateClassDto) {
    const classroomData: Record<string, any> = {
      name: createClassDto.name,
      ageGroup: createClassDto.ageGroup ?? undefined,
      capacity: createClassDto.capacity,
    };

    if (createClassDto.leadTeacherId) {
      classroomData.employees = {
        create: {
          employee: {
            connect: { id: createClassDto.leadTeacherId },
          },
          isLead: true,
        },
      };
    }

    return await this.prisma.classroom.create({ data: classroomData });
  }

  findAll() {
    return this.prisma.classroom.findMany({
      include: {
        employees: {
          include: {
            employee: true,
          },
        },
        inscriptions: true,
      },
    });
  }

  async findOne(id: string) {
    const classroom = await this.prisma.classroom.findUnique({
      where: { id },
      include: {
        employees: {
          include: {
            employee: true,
          },
        },
        inscriptions: true,
      },
    });

    if (!classroom) {
      throw new NotFoundException(`Classroom with id ${id} not found`);
    }

    return classroom;
  }

  async update(id: string, updateClassDto: UpdateClassDto) {
    await this.findOne(id);

    return this.prisma.classroom.update({
      where: { id },
      data: {
        name: updateClassDto.name,
        ageGroup: updateClassDto.ageGroup,
        capacity: updateClassDto.capacity,
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
