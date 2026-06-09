import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';

export enum ClassroomType {
  NURSERY = 'NURSERY',
  SCHOOL = 'SCHOOL',
}

export class CreateClassroomDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  ageGroup?: string;

  @IsInt()
  capacity: number;

  @IsEnum(ClassroomType)
  type: ClassroomType;
}