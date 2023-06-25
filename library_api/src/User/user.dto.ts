import { IsString, IsNotEmpty } from 'class-validator';

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
}
