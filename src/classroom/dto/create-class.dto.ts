import {
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateClassroomDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  ageGroup?: string;

  @IsInt()
  capacity: number;
}