import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { jwtConfig } from 'config/jwt.config';
import { UserModule } from 'user/user.module';
import { ListModule } from 'list/list.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy, LocalStrategy } from './strategies';

@Module({
  imports: [
    UserModule,
    ListModule,
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync(jwtConfig),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
