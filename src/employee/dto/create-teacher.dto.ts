import {
  IsEmail,
  IsEnum,
  IsString,
} from 'class-validator';

export enum EmployeeRole {
  ADMIN = 'ADMIN',
  RECEPTIONIST = 'RECEPTIONIST',
  TEACHER = 'TEACHER',
  ASSISTANT = 'ASSISTANT',
  KITCHEN = 'KITCHEN',
  CLEANER = 'CLEANER',
}

export class CreateEmployeeDto {
  @IsString()
  employeeNumber: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  phoneNumber: string;

  @IsEmail()
  email: string;

  @IsEnum(EmployeeRole)
  role: EmployeeRole;
}