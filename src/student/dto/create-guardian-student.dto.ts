import {
  IsBoolean,
  IsUUID,
} from 'class-validator';

export class CreateStudentGuardianDto {
  @IsUUID()
  studentId: string;

  @IsUUID()
  guardianId: string;

  @IsBoolean()
  isEmergencyContact: boolean;

  @IsBoolean()
  isAuthorizedToPickUp: boolean;
}