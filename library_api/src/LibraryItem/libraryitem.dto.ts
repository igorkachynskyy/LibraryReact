import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsNotEmpty, IsUUID } from 'class-validator';

export class LibraryItemDto {
  @IsNotEmpty()
  @IsDate()
  @ApiProperty()
  IssueDate: Date;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty()
  IsReturned: boolean;

  @IsNotEmpty()
  @IsDate()
  @ApiProperty()
  Deadline: Date;

  @IsNotEmpty()
  @IsUUID()
  @ApiProperty()
  PublicationItemID: string;

  @IsNotEmpty()
  @IsUUID()
  @ApiProperty()
  UserID: string;
}
