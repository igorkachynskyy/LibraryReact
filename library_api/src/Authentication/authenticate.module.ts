import { Module } from '@nestjs/common';
import { AuthenticateService } from './authenticate.service';
import { AuthenticateController } from './authenticate.controller';
import { UserService } from 'src/User/user.service';
import { JwtStrategy } from './jwt.strategy';

Module({
  imports: [],
  controllers: [AuthenticateController],
  providers: [AuthenticateService, UserService, JwtStrategy],
});

export class AuthenticateModule {}
