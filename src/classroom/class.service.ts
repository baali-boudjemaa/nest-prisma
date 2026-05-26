import { Injectable } from '@nestjs/common';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ClassService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createClassDto: CreateClassDto) {
    const classroomData = {
  name: createClassDto.name,
  ageGroup: createClassDto.ageGroup ?? null,
  roomNumber: createClassDto.roomNumber ?? null,
  maxCapacity: createClassDto.maxCapacity ?? 0,
  // Fix: Explicitly pass null instead of letting it be undefined
  employeeId: createClassDto.supervisorId  ,
};

      return await prisma.classroom.create({ data: classroomData });

  }

  findAll() {
    return `This action returns all class`;
  }

  findOne(id: number) {
    return `This action returns a #${id} class`;
  }

  update(id: number, updateClassDto: UpdateClassDto) {
    return `This action updates a #${id} class`;
  }

  remove(id: number) {
    return `This action removes a #${id} class`;
  }
}
