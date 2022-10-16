import { Model } from 'mongoose';
import { HttpException, HttpStatus, Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { ErrorsEnum, getAnimeList } from 'utils/index';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { List, ListDocument } from './schemas/list.schema';
import { IAnime } from 'anime/types';
import { ListsEnum } from './types';

@Injectable()
export class ListService {
  constructor(
    @InjectModel(List.name) public listModel: Model<ListDocument>,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  async findAll() {
    this.logger.info(`list-service findAll`);
    return this.listModel.find().exec();
  }

  async getFullList(list: ListDocument) {
    const fullLists = new Map<string, IAnime[]>();

    for (const listKey of Object.keys(ListsEnum)) {
      try {
        const anime = await getAnimeList(list[listKey]);
        fullLists.set(listKey, anime);
      } catch (error) {
        this.logger.error(`list-service getFullList ${JSON.stringify(error)}`);
        throw new Error(error);
      }
    }

    this.logger.info(`list-service getFullList`);
    return { _id: list._id, user_id: list.user_id, ...Object.fromEntries(fullLists) };
  }

  async findList(id: string) {
    const list = await this.listModel.findById(id).exec();

    if (!list) {
      this.logger.warn(`[${HttpStatus.NOT_FOUND}] list-service findList`);
      throw new HttpException(ErrorsEnum.notFound, HttpStatus.NOT_FOUND);
    }

    this.logger.info(`list-service findList`);
    return list;
  }

  async findOne(id: string, full: boolean) {
    const list = await this.findList(id);

    if (full) {
      return await this.getFullList(list);
    }

    this.logger.info(`list-service findOne`);
    return list;
  }

  async findByUser(userId: string, full: boolean) {
    const list = await this.listModel.findOne({ user_id: userId }).exec();

    if (!list) {
      this.logger.warn(`[${HttpStatus.NOT_FOUND}] list-service findByUser`);
      throw new HttpException(ErrorsEnum.notFound, HttpStatus.NOT_FOUND);
    }

    if (full) {
      return await this.getFullList(list);
    }

    this.logger.info(`list-service findByUser`);
    return list;
  }

  async create(createListDto: CreateListDto) {
    const createdList = new this.listModel(createListDto);
    this.logger.info(`list-service create`);
    return createdList.save();
  }

  async update(id: string, updateListDto: UpdateListDto) {
    await this.findList(id);
    this.logger.info(`list-service update`);
    return this.listModel.findByIdAndUpdate(id, updateListDto, { new: true }).exec();
  }

  async remove(id: string) {
    await this.findList(id);
    this.logger.info(`list-service remove`);
    return this.listModel.findByIdAndDelete(id);
  }
}
