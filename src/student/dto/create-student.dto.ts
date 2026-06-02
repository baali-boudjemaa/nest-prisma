import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  IsUUID, // 👈 ADD THIS LINE HERE
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { StudentLevel } from '@prisma/client';


export enum Sexe {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export class GuardianInfoDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  phoneNumber: string;

  @IsEmail()
  email: string;

  @IsString()
  address: string;
}

export class StudentGuardianDto {
  @IsString()
  relationship: string;

  @IsBoolean()
  isEmergency: boolean;

  @IsOptional()
  @IsString()
  createdById?: string;

  @ValidateNested()
  @Type(() => GuardianInfoDto)
  guardian: GuardianInfoDto;
}


// ... Keep GuardianInfoDto and StudentGuardianDto exactly as they are ...

export class CreateStudentDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsDateString()
  dateOfBirth: string;

  @IsEnum(Sexe)
  gender: Sexe;

  @IsOptional()
  @IsEnum(StudentLevel)
  level?: StudentLevel;

  @IsOptional()
  @IsString()
  medicalInfo?: string;

  // 👇 1. Add classId to the whitelist
  @IsUUID()
  classId: string;


  @IsOptional()
  @ValidateNested({ each: true }) // Or keep as object if you used Solution 2 previously
  @Type(() => StudentGuardianDto)
  guardians?: StudentGuardianDto[]; 
}
