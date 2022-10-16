import { Controller, Post, Get, UseGuards, Request, Body, Inject } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { AuthService } from './auth.service';
import { LocalAuthGuard, JwtAuthGuard } from './guards';
import { AuthRequest } from './types';
import { CreateUserDto } from 'user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    this.logger.info(`auth-controller login`);
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  getProfile(@Request() req: AuthRequest) {
    this.logger.info(`auth-controller profile`, { user: req.user });
    return req.user;
  }

  @Post('/signup')
  signup(@Body() createUserDto: CreateUserDto) {
    this.logger.info(`auth-controller signup`);
    return this.authService.signup(createUserDto);
  }
}
