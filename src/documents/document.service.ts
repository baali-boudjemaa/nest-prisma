import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UploadDocumentDto } from './dto/create.documents.dto';

@Injectable()
export class DocumentsService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async upload(
    dto: UploadDocumentDto,
    file: any,
    uploadedBy?: string,
  ) {
    return this.prisma.document.create({
      data: {
        ownerType: dto.ownerType,
        ownerId: dto.ownerId,
        type: dto.type,

        fileName: file.filename,
        originalName: file.originalname,

        mimeType: file.mimetype,
        fileSize: file.size,

        filePath: `uploads/documents/${file.filename}`,
        uploadedBy,
      },
    });
  }

  async findAll(studentId : string) {
    await this.prisma.document.findMany({
      where: {
        ownerType: 'STUDENT',
        ownerId: studentId,
      },
    });
  }
 
  async findByOwner(
    ownerType: string,
    ownerId: string,
  ) {
    return this.prisma.document.findMany({
      where: {
        ownerType: ownerType as any,
        ownerId,
      },
    });
  }

  async delete(id: string) {
    return this.prisma.document.delete({
      where: { id },
    });
  }
}