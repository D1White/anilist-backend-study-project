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
  Query,
  UseGuards,
  Inject,
  Request,
} from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { UserAclGuard } from 'user/guards/user-acl.guard';
import { JwtAuthGuard, AdminGuard } from 'auth/guards';
import { AuthRequest } from 'auth/types';
import { FindOneMongoParams, ListQuery } from 'utils/params';
import { ListService } from './list.service';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { ListAclGuard } from './guards/list-acl.guard';

@Controller('list')
export class ListController {
  constructor(
    private readonly listService: ListService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createListDto: CreateListDto, @Request() req: AuthRequest) {
    this.logger.info(`list-controller create`, { user: req.user });
    return this.listService.create(createListDto);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Get()
  findAll(@Request() req: AuthRequest) {
    this.logger.info(`list-controller findAll`, { user: req.user });
    return this.listService.findAll();
  }

  @UseGuards(JwtAuthGuard, ListAclGuard)
  @Get(':id')
  findOne(
    @Param() { id }: FindOneMongoParams,
    @Query() { full }: ListQuery,
    @Request() req: AuthRequest,
  ) {
    this.logger.info(`list-controller findOne`, { user: req.user, id, full });
    return this.listService.findOne(id, full === 'true');
  }

  @UseGuards(JwtAuthGuard, UserAclGuard)
  @Get('user/:id')
  findByUser(
    @Param() { id }: FindOneMongoParams,
    @Query() { full }: ListQuery,
    @Request() req: AuthRequest,
  ) {
    this.logger.info(`list-controller findByUser`, { user: req.user, id, full });
    return this.listService.findByUser(id, full === 'true');
  }

  @UseGuards(JwtAuthGuard, ListAclGuard)
  @Patch(':id')
  update(
    @Param() { id }: FindOneMongoParams,
    @Body() updateListDto: UpdateListDto,
    @Request() req: AuthRequest,
  ) {
    this.logger.info(`list-controller update`, { user: req.user, id });
    return this.listService.update(id, updateListDto);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param() { id }: FindOneMongoParams, @Request() req: AuthRequest) {
    this.logger.info(`list-controller remove`, { user: req.user, id });
    return this.listService.remove(id);
  }
}
