import { IsNotEmpty, IsString } from 'class-validator';

export class AuthenticateDto {
  @IsNotEmpty()
  @IsString()
  readonly login: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
