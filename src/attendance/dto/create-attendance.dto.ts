import {
  IsDateString,
  IsEnum,
  IsUUID,
} from 'class-validator';

export enum AttendanceStatus {
  PRESENT = 'PRESENT',
  ABSENT = 'ABSENT',
  EXCUSED = 'EXCUSED',
}

export class CreateAttendanceDto {
  @IsUUID()
  studentId: string;

  @IsDateString()
  date: Date;

  @IsEnum(AttendanceStatus)
  status: AttendanceStatus;
}