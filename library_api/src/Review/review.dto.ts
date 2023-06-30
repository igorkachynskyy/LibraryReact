import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class ReviewDto {
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty()
  UserID: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  Message: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  Rating: number;

  @IsNotEmpty()
  @IsUUID()
  @ApiProperty()
  PublicationItemID: string;
}
