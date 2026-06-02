import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { DocumentsController } from './document.controller';
import { DocumentsService } from './document.service';

@Module({
  controllers: [DocumentsController],
  providers: [DocumentsService, PrismaService],
  exports: [DocumentsService],
})
export class DocumentsModule {}