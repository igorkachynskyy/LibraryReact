import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { getEnvPath } from './common/helper/env.helper';
import { TypeOrmConfigService } from './shared/typeorm/typeorm.service';
import { AuthenticateController } from './Authentication/authenticate.controller';
import { AuthenticateService } from './Authentication/authenticate.service';
import { AuthenticateModule } from './Authentication/authenticate.module';
import { UserService } from './User/user.service';
import { UserModule } from './User/user.module';
import { User } from './User/user.entity';
import { JwtStrategy } from './Authentication/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { UserController } from './User/user.controller';
import { SeasonTicketController } from './SeasonTicket/seasonticket.controller';
import { SeasonTicket } from './SeasonTicket/seasonticket.entity';
import { SeasonTicketService } from './SeasonTicket/seasonticket.service';
import { SeasonTicketNodule } from './SeasonTicket/seasonticket.module';

const envFilePath: string = getEnvPath(`${__dirname}/common/envs`);
@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath, isGlobal: true }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    TypeOrmModule.forFeature([User, SeasonTicket]),
    JwtModule.register({
      secret: process.env.SECRET_KEY as string,
      signOptions: { expiresIn: process.env.EXPIRES_IN as string },
    }),
    AuthenticateModule,
    UserModule,
    SeasonTicketNodule,
  ],
  controllers: [AuthenticateController],
  providers: [AuthenticateService, UserService, JwtStrategy],
})
export class AppModule {}
