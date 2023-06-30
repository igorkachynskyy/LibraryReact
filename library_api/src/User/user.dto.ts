import {
  IsString,
  IsNotEmpty,
  isEnum,
  IsEnum,
  IsOptional,
  IsUUID,
} from 'class-validator';
import { Role } from './user.interface';
import { ApiProperty } from '@nestjs/swagger';
export class UserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  Name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  Surename: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  Login: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  Password: string;

  @IsNotEmpty()
  @IsEnum(Role)
  @ApiProperty()
  Role: Role;
}
