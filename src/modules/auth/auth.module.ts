import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { Config } from '../../shared/config/config';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';

@Module({
    imports: [
        JwtModule.register({
          secret: Config.jwt.secret,
          signOptions: { expiresIn: Config.jwt.expiresIn },
        })
      ],
      providers: [AuthService, JwtStrategy],
      exports: [AuthService],
      controllers: [AuthController] 
})
export class AuthModule {}
