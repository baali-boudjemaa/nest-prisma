import {IsNotEmpty, IsString,IsBoolean} from 'class-validator';
import { CreateGuardianDto } from './create-guardian.dto';

export class CreateGuardianStudentDto {
  @IsNotEmpty()
  @IsString()
  relationship: string;

  @IsNotEmpty()
  @IsBoolean()
  isEmergency: boolean;

  @IsNotEmpty()
  @IsString()
  createdById: string;
  @IsNotEmpty()
  guardian : CreateGuardianDto;
}