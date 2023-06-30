import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger/dist/decorators';
export class TagDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  Description: string;

  @IsUUID()
  @IsOptional()
  @ApiProperty()
  @IsArray()
  PublicationItemsID: string[] | null;
}
