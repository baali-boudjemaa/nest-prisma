import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateGuardianDto } from './dto/create-guardian.dto';
import { UpdateGuardianDto } from './dto/update-guardian.dto';

@Injectable()
export class GuardianService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createGuardianDto: CreateGuardianDto) {
    try {
      return await this.prisma.guardian.create({
        data: createGuardianDto,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException('Guardian with this email already exists.');
        }
      }
      throw error;
    }
  }

  findAll() {
    return this.prisma.guardian.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const guardian = await this.prisma.guardian.findUnique({
      where: { id },
    });

    if (!guardian) {
      throw new NotFoundException('Guardian not found');
    }

    return guardian;
  }

  async update(id: string, updateGuardianDto: UpdateGuardianDto) {
    await this.findOne(id);

    return this.prisma.guardian.update({
      where: { id },
      data: updateGuardianDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.guardian.delete({
      where: { id },
    });
  }

  search(query: string) {
    if (!query || !query.trim()) {
      return this.findAll();
    }

    return this.prisma.guardian.findMany({
      where: {
        OR: [
          {
            firstName: {
              contains: query,
              mode: 'insensitive' as Prisma.QueryMode,
            },
          },
          {
            lastName: {
              contains: query,
              mode: 'insensitive' as Prisma.QueryMode,
            },
          },
          {
            email: {
              contains: query,
              mode: 'insensitive' as Prisma.QueryMode,
            },
          },
        ],
      },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
  }
}
