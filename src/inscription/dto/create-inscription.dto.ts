import { IsEnum, IsUUID } from 'class-validator';
import { SessionName } from '@prisma/client';

export class CreateInscriptionDto {
  @IsUUID()
  studentId: string;

  @IsUUID()
  classId: string;

  @IsUUID()
  anneeScolaireId: string;

  @IsEnum(SessionName)
  session: SessionName;
}