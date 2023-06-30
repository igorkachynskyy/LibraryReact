import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { Role } from '../User/user.interface';

export class ProfileDto {
  @IsNotEmpty()
  @IsUUID()
  readonly id: string;

  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @IsNotEmpty()
  @IsString()
  readonly role: Role;
}
