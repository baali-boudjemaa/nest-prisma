import { Injectable } from '@nestjs/common';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ClassService {
  constructor(private readonly prisma: PrismaService) { }

  create(createClassDto: CreateClassDto) {
    return this.prisma.classroom.create({
      data: {
        name: createClassDto.name,
        ageGroup: createClassDto.ageGroup,
        roomNumber: createClassDto.roomNumber,
        maxCapacity: createClassDto.maxCapacity,
        leadTeacherId: createClassDto.leadTeacherId,
      },
    });
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
