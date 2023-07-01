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

  @IsUUID(undefined, { each: true })
  @IsOptional()
  @ApiProperty()
  @IsArray()
  PublicationItemsID: string[] | null;
}
