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
} from '@nestjs/common';
import { ListService } from './list.service';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { FindOneMongoParams, ListQuery } from 'utils/params';
import { JwtAuthGuard, AdminGuard } from 'auth/guards';
import { UserAclGuard } from 'user/guards/user-acl.guard';
import { ListAclGuard } from './guards/list-acl.guard';

@Controller('list')
export class ListController {
  constructor(private readonly listService: ListService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createListDto: CreateListDto) {
    return this.listService.create(createListDto);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Get()
  findAll() {
    return this.listService.findAll();
  }

  @UseGuards(JwtAuthGuard, ListAclGuard)
  @Get(':id')
  findOne(@Param() { id }: FindOneMongoParams, @Query() { full }: ListQuery) {
    return this.listService.findOne(id, full === 'true');
  }

  @UseGuards(JwtAuthGuard, UserAclGuard)
  @Get('user/:id')
  findByUser(@Param() { id }: FindOneMongoParams, @Query() { full }: ListQuery) {
    return this.listService.findByUser(id, full === 'true');
  }

  @UseGuards(JwtAuthGuard, ListAclGuard)
  @Patch(':id')
  update(@Param() { id }: FindOneMongoParams, @Body() updateListDto: UpdateListDto) {
    return this.listService.update(id, updateListDto);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param() { id }: FindOneMongoParams) {
    return this.listService.remove(id);
  }
}
