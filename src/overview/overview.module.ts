import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { OverviewController } from './overview.controller';
import { OverviewService } from './overview.service';
@Module({
  controllers: [OverviewController],
  providers: [PrismaService, OverviewService],
})
export class OverviewModule {}
