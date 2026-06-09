/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { StudentFilterDto } from '../common/dto/student-filter.dto';
@Injectable()
export class StudentService {
  constructor(private readonly prisma: PrismaService) { }
  async create(dto: CreateStudentDto) {
    let studentNumber = '';
    let retryCount = 0;
    const maxRetries = 5;

    while (retryCount < maxRetries) {
      const count = await this.prisma.student.count();
      studentNumber = `ST${String(count + 1 + retryCount).padStart(4, '0')}`;

      const existing = await this.prisma.student.findUnique({
        where: { studentNumber },
        select: { id: true },
      });

      if (!existing) break;
      retryCount++;
    }

    return this.prisma.student.create({
      data: {
        studentNumber,
        firstName: dto.firstName,
        lastName: dto.lastName,
        dateOfBirth: new Date(dto.dateOfBirth),
        gender: dto.gender,
        level: dto.level,
        medicalInfo: dto.medicalInfo,
        guardians: dto.guardians && dto.guardians.length > 0
          ? {
            create: dto.guardians.map((g) => {
              // 1. If an existing guardianId is supplied, bypass creation and connect it directly
              if (g.guardianId) {
                return {
                  relationship: g.relationship,
                  isEmergency: g.isEmergency,
                  createdById: g.createdById,
                  guardian: {
                    connect: { id: g.guardianId }
                  }
                };
              }

              // 2. Safeguard against runtime type crashes if guardian payload is completely empty
              if (!g.guardian) {
                throw new Error("Missing guardian identification parameters or detail payload.");
              }

              // 3. Fallback safely to connectOrCreate logic using the email unique index
              return {
                relationship: g.relationship,
                isEmergency: g.isEmergency,
                createdById: g.createdById,
                guardian: {
                  connectOrCreate: {
                    where: {
                      email: g.guardian.email,
                    },
                    create: {
                      firstName: g.guardian.firstName,
                      lastName: g.guardian.lastName,
                      phoneNumber: g.guardian.phoneNumber,
                      email: g.guardian.email,
                      address: g.guardian.address || "",
                      relation: g.relationship,
                    },
                  },
                },
              };
            }),
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

    try {
      return await this.prisma.$transaction(async (tx) => {
        await tx.student.update({
          where: { id },
          data: {
            ...(dto.firstName !== undefined && { firstName: dto.firstName }),
            ...(dto.lastName !== undefined && { lastName: dto.lastName }),
            ...(dto.dateOfBirth !== undefined && {
              dateOfBirth: new Date(dto.dateOfBirth),
            }),
            ...(dto.gender !== undefined && { gender: dto.gender }),
            ...(dto.level !== undefined && { level: dto.level }),
            ...(dto.medicalInfo !== undefined && {
              medicalInfo: dto.medicalInfo,
            }),
          },
        });

        if (dto.guardians?.length) {
          for (const g of dto.guardians) {
            if (g.guardianId) {
              const existingGuardian = await tx.guardian.findUnique({
                where: { id: g.guardianId },
              });

              if (!existingGuardian) {
                throw new NotFoundException(
                  `Guardian with id ${g.guardianId} not found`,
                );
              }

              if (g.guardian) {
                await tx.guardian.update({
                  where: { id: g.guardianId },
                  data: {
                    firstName: g.guardian.firstName,
                    lastName: g.guardian.lastName,
                    phoneNumber: g.guardian.phoneNumber,
                    email: g.guardian.email,
                    address: g.guardian.address,
                    relation: g.relationship,
                  },
                });
              }

              await tx.studentGuardian.upsert({
                where: {
                  studentId_guardianId: {
                    studentId: id,
                    guardianId: g.guardianId,
                  },
                },
                create: {
                  studentId: id,
                  guardianId: g.guardianId,
                  relationship: g.relationship,
                  isEmergency: g.isEmergency,
                  createdById: g.createdById,
                },
                update: {
                  relationship: g.relationship,
                  isEmergency: g.isEmergency,
                },
              });
            } else if (g.guardian) {
              const guardian = await tx.guardian.upsert({
                where: { email: g.guardian.email },
                update: {
                  firstName: g.guardian.firstName,
                  lastName: g.guardian.lastName,
                  phoneNumber: g.guardian.phoneNumber,
                  address: g.guardian.address,
                  relation: g.relationship,
                },
                create: {
                  firstName: g.guardian.firstName,
                  lastName: g.guardian.lastName,
                  phoneNumber: g.guardian.phoneNumber,
                  email: g.guardian.email,
                  address: g.guardian.address ?? '',
                  relation: g.relationship,
                },
              });

              await tx.studentGuardian.upsert({
                where: {
                  studentId_guardianId: {
                    studentId: id,
                    guardianId: guardian.id,
                  },
                },
                create: {
                  studentId: id,
                  guardianId: guardian.id,
                  relationship: g.relationship,
                  isEmergency: g.isEmergency,
                  createdById: g.createdById,
                },
                update: {
                  relationship: g.relationship,
                  isEmergency: g.isEmergency,
                },
              });
            } else {
              throw new BadRequestException(
                'Each guardian must include guardianId (existing) or guardian details (new)',
              );
            }
          }
        }

        return tx.student.findUnique({
          where: { id },
          include: {
            guardians: {
              include: {
                guardian: true,
              },
            },
          },
        });
      });
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
          case 'P2025':
            throw new NotFoundException(
              'Student or linked guardian record not found',
            );
          case 'P2002': {
            const fields =
              (error.meta?.target as string[] | undefined)?.join(', ') ??
              'unique field';
            throw new ConflictException(
              `A record with this ${fields} already exists`,
            );
          }
          case 'P2003':
            throw new BadRequestException(
              'Invalid reference: related record does not exist',
            );
        }
      }

      throw error;
    }
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
    await this.findOne(studentId);

    return this.prisma.studentGuardian.upsert({
      where: {
        studentId_guardianId: {
          studentId,
          guardianId,
        },
      },
      create: {
        studentId,
        guardianId,
      },
      update: {},
    });
  }

  async removeGuardian(studentId: string, guardianId: string) {
    await this.findOne(studentId);

    try {
      return await this.prisma.studentGuardian.delete({
        where: {
          studentId_guardianId: {
            studentId,
            guardianId,
          },
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new NotFoundException('Guardian link not found for this student');
      }
      throw error;
    }
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
        include: {
          guardians: {
            include: {
              guardian: true,
            },
          },
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