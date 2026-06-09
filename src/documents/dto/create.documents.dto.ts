import { IsEnum, IsString } from 'class-validator';
import {
  DocumentOwnerType,
  DocumentType,
} from '@prisma/client';

export class UploadDocumentDto {
  @IsEnum(DocumentOwnerType)
  ownerType: DocumentOwnerType;

  @IsString()
  ownerId: string;

  @IsEnum(DocumentType)
  type: DocumentType;

}