import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'user/user.module';
import { AuthService } from './auth.service';
import { JwtStrategy, LocalStrategy } from './strategies';
import { AuthController } from './auth.controller';
import { ConfigModule } from '@nestjs/config';
import { jwtConfig } from 'config/jwt.config';

@Module({
  imports: [UserModule, PassportModule, ConfigModule, JwtModule.registerAsync(jwtConfig)],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
