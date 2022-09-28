import { Model } from 'mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { List, ListDocument } from 'list/schemas/list.schema';
import { ListsEnum } from 'list/types';
import { ErrorsEnum } from 'utils/errors';
import { AnimeActionDto } from './dto/anime-action.dto';

@Injectable()
export class AnimeService {
  constructor(@InjectModel(List.name) private listModel: Model<ListDocument>) {}

  async addOrMove({ id, list_id, list }: AnimeActionDto) {
    const currentList = await this.listModel.findById(list_id).exec();

    if (!currentList) {
      throw new HttpException(ErrorsEnum.notFound, HttpStatus.NOT_FOUND);
    }

    const filterList = new Map<string, number[]>();

    Object.keys(ListsEnum).forEach((listKey) => {
      const filtredAnime = currentList[listKey].filter((animeId) => animeId !== id);
      filterList.set(listKey, filtredAnime);
    });

    filterList.set(list, [...filterList.get(list), id]);

    return this.listModel
      .findByIdAndUpdate(list_id, Object.fromEntries(filterList), { new: true })
      .exec();
  }
}
