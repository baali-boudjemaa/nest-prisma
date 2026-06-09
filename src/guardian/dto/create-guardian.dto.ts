import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateGuardianDto {
    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsString()
    phoneNumber: string;

    @IsEmail()
    email: string;

    @IsString()
    relation: string;

    @IsOptional()
    @IsString()
    address?: string;
}

