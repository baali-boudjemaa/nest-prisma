import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateInscriptionDto } from './dto/create-inscription.dto';

@Injectable()
export class InscriptionService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateInscriptionDto) {
    const student = await this.prisma.student.findUnique({
      where: { id: dto.studentId },
    });

    if (!student) {
      throw new NotFoundException('Student not found');
    }

    const classroom = await this.prisma.classroom.findUnique({
      where: { id: dto.classId },
    });

    if (!classroom) {
      throw new NotFoundException('Classroom not found');
    }

    const year = await this.prisma.anneeScolaire.findUnique({
      where: { id: dto.anneeScolaireId },
    });

    if (!year) {
      throw new NotFoundException('School year not found');
    }

    const existing = await this.prisma.inscription.findFirst({
      where: {
        studentId: dto.studentId,
        anneeScolaireId: dto.anneeScolaireId,
      },
    });

    if (existing) {
      throw new ConflictException(
        'Student already enrolled this year',
      );
    }

    return this.prisma.inscription.create({
      data: {
        studentId: dto.studentId,
        classId: dto.classId,
        anneeScolaireId: dto.anneeScolaireId,
        session: dto.session,
      },
      include: {
        student: true,
        classroom: true,
        anneeScolaire: true,
      },
    });
  }

  async findAll() {
    return this.prisma.inscription.findMany({
      include: {
        student: true,
        classroom: true,
        anneeScolaire: true,
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.inscription.findUnique({
      where: { id },
      include: {
        student: true,
        classroom: true,
        anneeScolaire: true,
      },
    });
  }

  async remove(id: string) {
    return this.prisma.inscription.delete({
      where: { id },
    });
  }
}