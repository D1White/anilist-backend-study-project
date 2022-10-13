import { Model } from 'mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ErrorsEnum, getAnimeList } from 'utils/index';
import { IAnime } from 'anime/types';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { List, ListDocument } from './schemas/list.schema';
import { ListsEnum } from './types';

@Injectable()
export class ListService {
  constructor(@InjectModel(List.name) private listModel: Model<ListDocument>) {}

  async findAll() {
    return this.listModel.find().exec();
  }

  async getFullList(list: ListDocument) {
    const fullLists = new Map<string, IAnime[]>();

    for (const listKey of Object.keys(ListsEnum)) {
      try {
        const anime = await getAnimeList(list[listKey]);
        fullLists.set(listKey, anime);
      } catch (error) {
        throw new Error(error);
      }
    }

    return { _id: list._id, user_id: list.user_id, ...Object.fromEntries(fullLists) };
  }

  async findList(id: string) {
    const list = await this.listModel.findById(id).exec();

    if (!list) {
      throw new HttpException(ErrorsEnum.notFound, HttpStatus.NOT_FOUND);
    }

    return list;
  }

  async findOne(id: string, full: boolean) {
    const list = await this.findList(id);

    if (full) {
      return await this.getFullList(list);
    }

    return list;
  }

  async findByUser(userId: string, full: boolean) {
    const list = await this.listModel.findOne({ user_id: userId }).exec();

    if (!list) {
      throw new HttpException(ErrorsEnum.notFound, HttpStatus.NOT_FOUND);
    }

    if (full) {
      return await this.getFullList(list);
    }

    return list;
  }

  async create(createListDto: CreateListDto) {
    const createdList = new this.listModel(createListDto);
    return createdList.save();
  }

  async update(id: string, updateListDto: UpdateListDto) {
    await this.findList(id);
    return this.listModel.findByIdAndUpdate(id, updateListDto, { new: true }).exec();
  }

  async remove(id: string) {
    await this.findList(id);
    return this.listModel.findByIdAndDelete(id);
  }
}
