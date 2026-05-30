import {
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';

import { PaginationDto } from '../../common/dto/pagination.dto';

export enum CourseType {
  LANGUAGE = 'LANGUAGE',
  SCIENCE = 'SCIENCE',
  SUPPORT = 'SUPPORT',
}

export class CourseFilterDto extends PaginationDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsEnum(CourseType)
  type?: CourseType;
}