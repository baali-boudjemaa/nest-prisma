import {} from '@nestjs/common';
import { IsEmail, IsNotEmpty } from 'class-validator';  

export class CreateGuardianDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  phoneNumber: string;

  @IsNotEmpty()
  address :string;
}