import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSchoolYearDto } from './dto/create-school-year.dto';
import { UpdateSchoolYearDto } from './dto/update-school-year.dto';

@Injectable()
export class SchoolYearsService {
    constructor(private readonly prisma: PrismaService) { }

    async create(createSchoolYearDto: CreateSchoolYearDto) {
        return this.prisma.anneeScolaire.create({
            data: {
                libelleAnneesc: createSchoolYearDto.libelleAnneesc,
            },
        });
    }

    findAll() {
        return this.prisma.anneeScolaire.findMany();
    }

    async findOne(id: string) {
        const year = await this.prisma.anneeScolaire.findUnique({
            where: { id },
        });

        if (!year) {
            throw new NotFoundException(`School year with id ${id} not found`);
        }

        return year;
    }

    async update(id: string, updateSchoolYearDto: UpdateSchoolYearDto) {
        await this.findOne(id);

        return this.prisma.anneeScolaire.update({
            where: { id },
            data: {
                libelleAnneesc: updateSchoolYearDto.libelleAnneesc,
            },
        });
    }

    async remove(id: string) {
        await this.findOne(id);

        return this.prisma.anneeScolaire.delete({
            where: { id },
        });
    }
}
