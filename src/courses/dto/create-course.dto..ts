import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export enum CourseType {
  LANGUAGE = 'LANGUAGE',
  SCIENCE = 'SCIENCE',
  SUPPORT = 'SUPPORT',
}

export class CreateCourseDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsEnum(CourseType)
  type: CourseType;

  @IsNumber()
  monthlyFee: number;

  @IsOptional()
  @IsUUID()
  teacherId?: string;
}