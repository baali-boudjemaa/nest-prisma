import {
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';

export enum Sexe {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export enum StudentLevel {
  NURSERY = 'NURSERY',
  PRIMARY = 'PRIMARY',
  MIDDLE = 'MIDDLE',
  SECONDARY = 'SECONDARY',
}

export class CreateStudentDto {
  @IsString()
  studentNumber: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsDateString()
  dateOfBirth: Date;

  @IsOptional()
  @IsEnum(Sexe)
  gender?: Sexe;

  @IsOptional()
  @IsEnum(StudentLevel)
  level?: StudentLevel;

  @IsOptional()
  @IsString()
  medicalInfo?: string;
}