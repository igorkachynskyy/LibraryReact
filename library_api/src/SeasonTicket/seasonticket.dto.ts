import {
  IsNumber,
  IsDate,
  IsNotEmpty,
  IsEnum,
  IsString,
} from 'class-validator';
import { TicketType } from './seasonticket.entity';

export class SeasonTicketDto {
  @IsNotEmpty()
  @IsString()
  UserID: string;

  @IsNotEmpty()
  @IsEnum(TicketType)
  TicketType: TicketType;

  @IsNotEmpty()
  @IsNumber()
  Price: number;

  @IsNotEmpty()
  @IsDate()
  CreateDate: Date;

  @IsNotEmpty()
  @IsDate()
  ExpirationDate: Date;
}
