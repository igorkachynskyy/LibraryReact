import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthorDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  Name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  Surename: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  Rate: number;

  @IsArray()
  @IsUUID()
  @IsOptional()
  @ApiProperty()
  BooksID: string[];
}
