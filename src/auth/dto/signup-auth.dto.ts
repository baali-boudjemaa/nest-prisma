import { IsEmail, IsNotEmpty } from 'class-validator';
import { UserRole } from '@prisma/client';
export class signupDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  password: string;
  @IsNotEmpty()
  role: UserRole;
  @IsNotEmpty()
  name: string;
}
