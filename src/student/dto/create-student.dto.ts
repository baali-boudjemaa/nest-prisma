import { IsEmail, MinLength, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateGuardianStudentDto } from './create-guardian-student.dto';

export class CreateStudentDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  dateOfBirth: Date;

  @IsNotEmpty()
  gender: string;

  @IsNotEmpty()
  medicalInfo: string;

  @IsNotEmpty()
  enrollmentDate: Date;

  @IsNotEmpty()
  classId : string;

  @ValidateNested()
  @Type(() => CreateGuardianStudentDto)
  @IsNotEmpty()
  guardians: CreateGuardianStudentDto;
}
