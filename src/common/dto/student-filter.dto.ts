import {
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';

import { PaginationDto } from '../../common/dto/pagination.dto';

export enum StudentLevel {
  NURSERY = 'NURSERY',
  PRIMARY = 'PRIMARY',
  MIDDLE = 'MIDDLE',
  SECONDARY = 'SECONDARY',
}

export class StudentFilterDto extends PaginationDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsEnum(StudentLevel)
  level?: StudentLevel;
}