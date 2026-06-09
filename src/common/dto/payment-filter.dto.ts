import {
  IsDateString,
  IsOptional,
} from 'class-validator';

import { PaginationDto } from '../../common/dto/pagination.dto';

export class PaymentFilterDto extends PaginationDto {
  @IsOptional()
  @IsDateString()
  from?: Date;

  @IsOptional()
  @IsDateString()
  to?: Date;
}