import { IsEmail, MinLength, IsNotEmpty, } from 'class-validator';
// create-student.dto.ts

export class CreateStudentDto {
  firstName!: string;
  lastName!: string;
  dateOfBirth!: string;

  gender?: 'MALE' | 'FEMALE';

  medicalInfo?: string;

  guardian!: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    relation: string;
    address?: string;

    isEmergencyContact?: boolean;
    isAuthorizedToPickUp?: boolean;
  };
}
