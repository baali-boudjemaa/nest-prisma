import {
  IsDateString,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateExamDto {
  @IsString()
  title: string;

  @IsUUID()
  courseId: string;

  @IsDateString()
  examDate: Date;
}