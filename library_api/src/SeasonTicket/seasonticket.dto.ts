import { IsNumber, IsDate, IsNotEmpty, IsEnum, IsUUID } from 'class-validator';
import { TicketType } from './seasonticket.entity';
import { ApiProperty } from '@nestjs/swagger/dist';
export class SeasonTicketDto {
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty()
  UserID: string;

  @IsNotEmpty()
  @IsEnum(TicketType)
  @ApiProperty()
  TicketType: TicketType;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  Price: number;

  @IsNotEmpty()
  @IsDate()
  @ApiProperty()
  CreateDate: Date;

  @IsNotEmpty()
  @IsDate()
  @ApiProperty()
  ExpirationDate: Date;
}
