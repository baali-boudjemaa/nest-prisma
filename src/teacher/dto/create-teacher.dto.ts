import { IsEmail, IsNotEmpty, IsOptional, IsString, IsPhoneNumber } from 'class-validator';

export class CreateTeacherDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  // You can use @IsPhoneNumber('DZ') if you want to strictly validate Algerian numbers
  phoneNumber: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsOptional()
  certifications?: string; // e.g., "CPR, ECE"
}

