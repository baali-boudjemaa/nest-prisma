import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString, IsDateString, IsEnum } from 'class-validator';
import { CreateStudentDto, Sexe } from './create-student.dto';

export class UpdateStudentDto extends PartialType(CreateStudentDto) {
    @IsOptional()
    @IsString()
    firstName?: string;
    
    @IsOptional()
    @IsString()
    lastName?: string;

    @IsOptional()
    @IsDateString()
    dateOfBirth?: string;

    @IsOptional()
    @IsEnum(Sexe)
    gender?: Sexe;

    @IsOptional()
    @IsString()
    medicalInfo?: string;

    @IsOptional()
    @IsDateString()
    enrollmentDate?: Date;

    @IsOptional()
    @IsString()
    classId?: string;
}
