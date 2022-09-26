import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ListService } from 'list/list.service';
import { IList, ListsEnum } from 'list/types';
import { ErrorsEnum, getEntityById } from 'utils/index';
import { AnimeActionDto } from './dto/anime-action.dto';

@Injectable()
export class AnimeService {
  constructor(private readonly listService: ListService) {}

  addOrMove({ id, list_id, list }: AnimeActionDto) {
    const [currentList, filterLists] = getEntityById<IList>(list_id, this.listService.lists);

    if (!currentList) {
      throw new HttpException(ErrorsEnum.listNotFound, HttpStatus.NOT_FOUND);
    }

    const filterList = new Map<string, number[]>();

    Object.keys(ListsEnum).forEach((listKey) => {
      const filtredAnime = currentList[listKey].filter((animeId) => animeId !== id);
      filterList.set(listKey, filtredAnime);
    });

    filterList.set(list, [...filterList.get(list), id]);

    const updatedLists = [...filterLists, { ...currentList, ...Object.fromEntries(filterList) }];

    this.listService.lists = updatedLists;
  }
}
