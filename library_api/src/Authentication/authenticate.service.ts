import {
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { AuthenticateDto } from './authenticate.dto';
import { IAuthenticate, Role } from 'src/User/user.interface';
import { User } from 'src/User/user.entity';
import { UserService } from 'src/User/user.service';

@Injectable()
export class AuthenticateService {
  constructor(private readonly userService: UserService) {}

  public async authenticate(
    authenticateDto: AuthenticateDto,
  ): Promise<IAuthenticate> {
    const user: User | null = await this.userService.GetUser({
      where: {
        Password: authenticateDto.password,
        Login: authenticateDto.login,
      },
    });
    if (!user) {
      throw new NotFoundException('Invalid credentials');
    }
    const token = sign({ ...user }, process.env.SECRET_KEY as string);
    return { token, user };
  }
}
