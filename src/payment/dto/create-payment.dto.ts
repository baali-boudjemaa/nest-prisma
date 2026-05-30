import {
  IsEnum,
  IsNumber,
  IsString,
  IsUUID,
} from 'class-validator';

export enum PaymentType {
  CASH = 'CASH',
  CARD = 'CARD',
  TRANSFER = 'TRANSFER',
}

export class CreatePaymentDto {
  @IsUUID()
  inscriptionId: string;

  @IsNumber()
  amount: number;

  @IsEnum(PaymentType)
  paymentMethod: PaymentType;

  @IsString()
  label: string;
}