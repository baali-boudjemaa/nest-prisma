import { SessionName } from '@prisma/client';
import { IsEnum, IsNumber, Min } from 'class-validator';

export class CreateSessionDto {
    @IsEnum(SessionName)
    session: SessionName;

    @IsNumber()
    @Min(0)
    monthlyFee: number;
}
