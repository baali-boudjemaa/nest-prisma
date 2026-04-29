import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
@Injectable()
export class OverviewService {
  constructor(private prismaService: PrismaService) {}

  async getOverview() {
    const totalUsers = await this.prismaService.user.count();
    const totalStudents = await this.prismaService.student.count();
    const totalTeachers = await this.prismaService.teacher.count();
    return {
      totalUsers,
      totalStudents,
      totalTeachers,
    };
  }
}
