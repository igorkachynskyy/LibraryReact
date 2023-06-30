import { IsNotEmpty, IsUrl } from 'class-validator';
import { PublicationItemDto } from 'src/PublicationItem/publicationitem.dto';
import { ApiProperty } from '@nestjs/swagger';
export class JournalDto extends PublicationItemDto {
  @IsUrl()
  @IsNotEmpty()
  @ApiProperty()
  ImagePath: string;
}
