import { Module } from '@nestjs/common';
import { UserService } from 'src/User/user.service';
import { AuthenticateService } from './authenticate.service';
import { AuthenticateController } from './authenticate.controller';
import { UserModule } from 'src/User/user.module';

Module({
  imports: [],
  controllers: [],
  providers: [],
});

export class AuthenticateModule {}
