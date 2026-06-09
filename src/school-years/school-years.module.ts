import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SchoolYearsController } from './school-years.controller';
import { SchoolYearsService } from './school-years.service';

@Module({
    imports: [],
    controllers: [SchoolYearsController],
    providers: [SchoolYearsService, PrismaService],
})
export class SchoolYearsModule { }
