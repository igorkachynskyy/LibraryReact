import { Module } from '@nestjs/common';
import { AuthenticateService } from './authenticate.service';
import { AuthenticateController } from './authenticate.controller';
import { UserService } from 'src/User/user.service';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from 'src/User/user.module';

Module({
  imports: [],
  controllers: [AuthenticateController],
  providers: [AuthenticateService, JwtStrategy],
  //exports: [AuthenticateService, JwtStrategy, AuthenticateController],
});

export class AuthenticateModule {}
