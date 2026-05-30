/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Sexe } from '@prisma/client';

import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { StudentFilterDto } from '../common/dto/student-filter.dto';

@Injectable()
export class StudentService {
  constructor(private readonly prisma: PrismaService) { }

  async create(dto: CreateStudentDto) {
    const count = await this.prisma.student.count();

    const studentNumber = `ST${String(count + 1).padStart(4, '0')}`;

    return this.prisma.student.create({
      data: {
        studentNumber,

        firstName: dto.firstName,
        lastName: dto.lastName,
        dateOfBirth: new Date(dto.dateOfBirth),

        gender: dto.gender,
        medicalInfo: dto.medicalInfo,

        guardians: dto.guardian
          ? {
            create: {
          

              guardian: {
                create: {
                  firstName: dto.guardian.firstName,
                  lastName: dto.guardian.lastName,
                  phoneNumber: dto.guardian.phoneNumber,
                  email: dto.guardian.email,
                  relation: dto.guardian.relation,
                  address: dto.guardian.address,
                },
              },
            },
          }
          : undefined,
      },

      include: {
        guardians: {
          include: {
            guardian: true,
          },
        },
      },
    });
  }



  async findOne(id: string) {
    const student = await this.prisma.student.findUnique({
      where: { id },

      include: {
        guardians: {
          include: {
            guardian: true,
          },
        },

        inscriptions: {
          include: {
            classroom: true,
            anneeScolaire: true,
            payments: true,
          },
        },

        attendance: true,
        absences: true,
        dailyLogs: true,

        milestones: {
          include: {
            milestone: true,
          },
        },
      },
    });

    if (!student) {
      throw new NotFoundException('Student not found');
    }

    return student;
  }

  async update(id: string, dto: UpdateStudentDto) {
    await this.findOne(id);

    return this.prisma.student.update({
      where: { id },

      data: {
        ...(dto.firstName && {
          firstName: dto.firstName,
        }),

        ...(dto.lastName && {
          lastName: dto.lastName,
        }),

        ...(dto.gender && {
          // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
          gender: dto.gender as Sexe,
        }),

        ...(dto.medicalInfo && {
          medicalInfo: dto.medicalInfo,
        }),

        ...(dto.dateOfBirth && {
          dateOfBirth: new Date(dto.dateOfBirth),
        }),
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.student.delete({
      where: { id },
    });
  }

  async assignExistingGuardian(
    studentId: string,
    guardianId: string,

  ) {
    return this.prisma.studentGuardian.create({
      data: {
        studentId,
        guardianId,
      },
    });
  }

  async createInscription(
    studentId: string,
    anneeScolaireId: string,
    classId: string,
    session:
      | 'MATINEE'
      | 'JOURNEE_COMPLETE'
      | 'PERISCOLAIRE' = 'JOURNEE_COMPLETE',
  ) {
    return this.prisma.inscription.create({
      data: {
        studentId,
        anneeScolaireId,
        classId,
        session,
      },
    });
  }
  async findAll(filter: StudentFilterDto) {
    const { page = 1, limit = 10, search } = filter;

    const where = search
      ? {
        OR: [
          {
            firstName: {
              contains: search,
              mode: 'insensitive' as Prisma.QueryMode,
            },
          },
          {
            lastName: {
              contains: search,
              mode: 'insensitive' as Prisma.QueryMode,
            },
          },
          {
            studentNumber: {
              contains: search,
              mode: 'insensitive' as Prisma.QueryMode,
            },
          },
        ],
      }
      : {};

    const [data, total] = await this.prisma.$transaction([
      this.prisma.student.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
      }),
      this.prisma.student.count({
        where,
      }),
    ]);

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
}