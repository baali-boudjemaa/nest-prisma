import { OmitType, PartialType } from '@nestjs/mapped-types';
import { IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateStudentDto, StudentGuardianDto } from './create-student.dto';

export class UpdateStudentDto extends PartialType(
  OmitType(CreateStudentDto, ['guardians'] as const),
) {
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => StudentGuardianDto)
  guardians?: StudentGuardianDto[];
}
