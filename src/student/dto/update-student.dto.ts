import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString, IsDateString } from 'class-validator';
import { CreateStudentDto } from './create-student.dto';

export class UpdateStudentDto extends PartialType(CreateStudentDto) {
    @IsOptional()
    @IsString()
    firstName?: string;

    @IsOptional()
    @IsString()
    lastName?: string;

    @IsOptional()
    @IsDateString()
    dateOfBirth?: Date;

    @IsOptional()
    @IsString()
    gender?: string;

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
