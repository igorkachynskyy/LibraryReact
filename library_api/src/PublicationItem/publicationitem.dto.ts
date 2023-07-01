import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsEnum,
  IsOptional,
  IsArray,
  ValidateNested,
  IsNumber,
  IsUUID,
  IsDateString,
} from 'class-validator';
import { Language } from './publicationitem.entity';
import { ApiProperty } from '@nestjs/swagger/dist';

export class PublicationItemDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  Title: string;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty()
  DatePublished: Date;

  @IsEnum(Language)
  @ApiProperty()
  Language: Language;

  @IsUUID()
  @ApiProperty()
  PublisherID: string | null;

  @IsArray()
  @ValidateNested({ each: true })
  @IsOptional()
  @IsUUID(undefined, { each: true })
  @ApiProperty()
  TagsID: string[] | null;

  @IsString()
  @ApiProperty()
  Preview: string;

  @IsArray()
  @ValidateNested({ each: true })
  @IsOptional()
  @IsUUID(undefined, { each: true })
  @ApiProperty()
  ReviewsID: string[] | null;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  Rating: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  Price: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  Pages: number;
}
