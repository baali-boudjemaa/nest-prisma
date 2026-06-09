import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
@Injectable()
export class SessionService {
    constructor(private readonly prisma: PrismaService) { }

    async create(dto: CreateSessionDto) {
        return this.prisma.sessionPricing.create({
            data: {
                session: dto.session,
                monthlyFee: dto.monthlyFee,
            },
        });
    }

    findAll() {
        return this.prisma.sessionPricing.findMany();
    }

    async findOne(id: string) {
        const session = await this.prisma.sessionPricing.findUnique({
            where: { id },
        });

        if (!session) {
            throw new NotFoundException(`Session pricing with id ${id} not found`);
        }

        return session;
    }

    async update(id: string, dto: UpdateSessionDto) {
        await this.findOne(id);

        return this.prisma.sessionPricing.update({
            where: { id },
            data: {
                session: dto.session,
                monthlyFee: dto.monthlyFee,
            },
        });
    }

    async remove(id: string) {
        await this.findOne(id);
        return this.prisma.sessionPricing.delete({
            where: { id },
        });
    }
}
