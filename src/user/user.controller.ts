import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
  Inject,
  Request,
} from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { JwtAuthGuard, AdminGuard } from 'auth/guards';
import { AuthRequest } from 'auth/types';
import { FindOneMongoParams } from 'utils/params';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserAclGuard } from './guards/user-acl.guard';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Get()
  findAll(@Request() req: AuthRequest) {
    this.logger.info(`user-controller findAll`, { user: req.user });
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard, UserAclGuard)
  @Get(':id')
  findOne(@Param() { id }: FindOneMongoParams, @Request() req: AuthRequest) {
    this.logger.info(`user-controller findOne`, { user: req.user, id });
    return this.userService.findOne(id);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    this.logger.info(`user-controller create`);
    return this.userService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard, UserAclGuard)
  @Patch(':id')
  update(
    @Param() { id }: FindOneMongoParams,
    @Body() updateUserDto: UpdateUserDto,
    @Request() req: AuthRequest,
  ) {
    this.logger.info(`user-controller update`, { user: req.user, id });
    return this.userService.update(id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard, UserAclGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param() { id }: FindOneMongoParams, @Request() req: AuthRequest) {
    this.logger.info(`user-controller remove`, { user: req.user, id });
    return this.userService.remove(id);
  }
}
