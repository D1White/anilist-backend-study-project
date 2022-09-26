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
} from '@nestjs/common';
import { ListService } from './list.service';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { FindOneParams, ListQuery } from 'utils/params';

@Controller('list')
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Post()
  create(@Body() createListDto: CreateListDto) {
    return this.listService.create(createListDto);
  }

  @Get()
  findAll() {
    return this.listService.findAll();
  }

  @Get(':id')
  findOne(@Param() { id }: FindOneParams, @Query() { full }: ListQuery) {
    return this.listService.findOne(+id, full === 'true');
  }

  @Get('user/:id')
  findByUser(@Param() { id }: FindOneParams, @Query() { full }: ListQuery) {
    return this.listService.findByUser(+id, full === 'true');
  }

  @Patch(':id')
  update(@Param() { id }: FindOneParams, @Body() updateListDto: UpdateListDto) {
    return this.listService.update(+id, updateListDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param() { id }: FindOneParams) {
    return this.listService.remove(+id);
  }
}
