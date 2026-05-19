import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGuardianDto } from './dto/create-guardian.dto';
import { CreateGuardianStudentDto } from './dto/create-guardian-student.dto';
@Injectable()
export class StudentService {
  constructor(private prisma: PrismaService) { }
  /* 
    async create(
      createStudentDto: CreateStudentDto,
      createGuardianDto: CreateGuardianDto,
      createGuardianStudentDto: CreateGuardianStudentDto,
      userId: string,
    ) {
      return this.prisma.student.create({
        data: {
          firstName: createStudentDto.firstName,
          lastName: createStudentDto.lastName,
          dateOfBirth: new Date(createStudentDto.dateOfBirth),
          gender: createStudentDto.gender,
          medicalInfo: createStudentDto.medicalInfo,
          classId: createStudentDto.classId,
          guardians: {
            create: [
              {
                relationship: createGuardianStudentDto.relationship,
                isEmergency: createGuardianStudentDto.isEmergency ?? true,
                createdBy: {
                  connect: { id: userId },
                },
                guardian: {
                  create: {
                    firstName: createGuardianDto.firstName,
                    lastName: createGuardianDto.lastName,
                    phoneNumber: createGuardianDto.phoneNumber,
                    email: createGuardianDto.email,
                    address: createGuardianDto.address,
                  },
                },
              },
            ],
          },
        },
      });
    }
   */
  async create(createStudentDto: CreateStudentDto) {
    const { guardians, ...studentData } = createStudentDto;

    return this.prisma.student.create({
      data: {
        ...studentData,
        dateOfBirth: new Date(studentData.dateOfBirth),
        enrollmentDate: new Date(studentData.enrollmentDate),
        guardians: {
          create: {
            relationship: guardians.relationship,
            isEmergency: guardians.isEmergency,
            // Link the user who is performing the creation
            createdBy: { connect: { id: guardians.createdById } },
            // Create the actual guardian
            guardian: {
              create: guardians.guardian
            }
          }
        }
      }
    });
  }


  findAll() {
    return this.prisma.student.findMany({
      include: {
        guardians: true,
        class: true,
        attendance: true,
        payments: true,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.student.findUnique({
      where: { id },
      include: {
        guardians: {
          include: {
            guardian: true,
          },
        },
        class: true,
        attendance: true,
        payments: true,
      },
    });
  }

  async update(id: string, updateStudentDto: UpdateStudentDto) {
    // Filter out undefined values and transform dates
    const updateData: any = {};

  

    return this.prisma.student.update({
      where: { id },
      data: updateData,
      include: {
        guardians: true,
        class: true,
      },
    });
  }

  async remove(id: string) {
    return this.prisma.student.delete({
      where: { id },
    });
  }
}
