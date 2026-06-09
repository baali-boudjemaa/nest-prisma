import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSchoolYearDto {
    @IsString()
    @IsNotEmpty()
    libelleAnneesc: string;
}
