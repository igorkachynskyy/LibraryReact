import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger/dist';
export class PublisherDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  Name: string;

  @IsUUID()
  @IsOptional()
  @ApiProperty()
  @IsArray()
  PublicationItemsID: string[] | null;
}
