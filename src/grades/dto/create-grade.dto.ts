import {
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateGradeDto {
  @IsUUID()
  examId: string;

  @IsUUID()
  studentId: string;

  @IsNumber()
  score: number;

  @IsOptional()
  @IsString()
  remarks?: string;
}