import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JwtPayload } from 'jsonwebtoken';
import { User } from 'src/User/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET_KEY as string,
    });
  }

  async validate(payload: JwtPayload) {
    const user: User = {
      ID: payload.ID,
      Name: payload.Name,
      Surename: payload.Surename,
      Login: payload.Login,
      Password: payload.Password,
      Role: payload.Role,
      LibraryItems: null,
      SeasonTicket: payload.SeasonTicket ? payload.SeasonTicket : null,
      Reviews: null,
    };
    return user;
  }
}
