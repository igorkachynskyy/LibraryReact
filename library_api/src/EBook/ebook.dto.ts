import { IsArray, IsEnum, IsNotEmpty, IsUUID, IsUrl } from 'class-validator';
import { PublicationItemDto } from 'src/PublicationItem/publicationitem.dto';
import { ApiProperty } from '@nestjs/swagger/dist';
import { Genre } from 'src/Book/book.entity';

export class EBookDto extends PublicationItemDto {
  @IsArray()
  @IsNotEmpty()
  @IsUUID(undefined, { each: true })
  @ApiProperty()
  AuthorsID: string[];

  @IsUrl()
  @IsNotEmpty()
  @ApiProperty()
  ImagePath: string;

  @IsNotEmpty()
  @IsEnum(Genre)
  @ApiProperty()
  Genre: Genre;
}
