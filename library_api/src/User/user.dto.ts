import { IsString, IsNotEmpty, isEnum, IsEnum } from 'class-validator';
import { Role } from './user.interface';
export class UserDto {
  @IsNotEmpty()
  @IsString()
  Name: string;

  @IsNotEmpty()
  @IsString()
  Surename: string;

  @IsNotEmpty()
  @IsString()
  Login: string;

  @IsNotEmpty()
  @IsString()
  Password: string;

  @IsNotEmpty()
  @IsEnum(Role)
  Role: Role;
}
