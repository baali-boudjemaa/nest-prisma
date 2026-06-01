import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

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

export class CreateStudentGuardianDto {
  @IsString()
  firstName!: string;

  @IsString()
  lastName!: string;

  @IsString()
  phoneNumber!: string;

  @IsString()
  email!: string;

  @IsString()
  relation!: string;

  @IsString()
  address!: string;

  @IsOptional()
  @IsBoolean()
  isEmergencyContact?: boolean;

  @IsOptional()
  @IsBoolean()
  isAuthorizedToPickUp?: boolean;
}

export class CreateStudentDto {
  [x: string]: any;

  @IsString()
  firstName!: string;

  @IsString()
  lastName!: string;

  @IsDateString()
  dateOfBirth!: string;

  @IsOptional()
  @IsEnum(Sexe)
  gender?: Sexe;

  @IsOptional()
  @IsEnum(StudentLevel)
  level?: StudentLevel;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateStudentGuardianDto)
  guardian?: CreateStudentGuardianDto;

  @IsOptional()
  @IsString()
  medicalInfo?: string;
}