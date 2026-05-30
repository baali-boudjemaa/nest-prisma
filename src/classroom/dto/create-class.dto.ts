import { IsInt, IsNotEmpty, IsOptional, IsString, IsUUID, Min } from 'class-validator';

export class CreateClassDto {
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsString()
  @IsOptional()
  ageGroup?: string;

  @IsInt()
  @Min(1)
  capacity?: number;

  @IsUUID()
  @IsOptional()
  leadTeacherId?: string;
}
