import { IsString, IsNotEmpty, IsOptional, IsInt, Min, IsUUID } from 'class-validator';

export class CreateClassDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  ageGroup?: string;

  @IsString()
  @IsOptional()
  roomNumber?: string;

  @IsInt()
  @Min(1)
  @IsOptional()
  maxCapacity?: number;

  @IsUUID() // Assuming Teacher ID is a UUID
  @IsOptional()
  leadTeacherId?: string;
}
