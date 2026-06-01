/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  [x: string]: any;
  findOne(arg0: number) {
    throw new Error('Method not implemented.');
  }
  getAllUsers() {
    throw new Error('Method not implemented.');
  }
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(dto: CreateUserDto) {
    const exists =
      await this.prisma.user.findUnique({
        where: {
          email: dto.email,
        },
      });

    if (exists) {
      throw new BadRequestException(
        'Email already exists',
      );
    }

    const hashedPassword =
      await bcrypt.hash(dto.password, 10);

    return this.prisma.user.create({
      data: {
        email: dto.email,
        password: hashedPassword,
        role: dto.role,
        employeeId: dto.employeeId,
        guardianId: dto.guardianId,
      },
      select: {
        id: true,
        email: true,
        role: true,
      },
    });
  }
}
