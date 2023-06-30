import { IsArray, IsEnum, IsNotEmpty, IsUUID, IsUrl } from 'class-validator';
import { PublicationItemDto } from 'src/PublicationItem/publicationitem.dto';
import { ApiProperty } from '@nestjs/swagger/dist';
import { Genre } from './book.entity';

export class BookDto extends PublicationItemDto {
  @IsArray()
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty()
  AuthorsID: string[];

  @IsUrl()
  @IsNotEmpty()
  ImagePath: string;

  @IsNotEmpty()
  @IsEnum(Genre)
  Genre: Genre;
}
