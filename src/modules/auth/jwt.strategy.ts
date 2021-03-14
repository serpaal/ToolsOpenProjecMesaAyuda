import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Inject } from '@nestjs/common';
import { Config } from '../../shared/config';
import * as CryptoJS from 'crypto-js';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject('SequelizeInstance') private sequelizeInstance) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: Config.jwt.secret,
    });
  }

  async validate(payload: any) {
    this.sequelizeInstance.connectionManager.config.username = payload.username,
    this.sequelizeInstance.connectionManager.config.password = CryptoJS.AES.decrypt(payload.guid, Config.jwt.secret).toString(CryptoJS.enc.Utf8);            
    return { username: payload.username };
  }
}