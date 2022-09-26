import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { IList, ListsEnum } from './types';
import { ErrorsEnum, getEntityById, getAnimeList } from 'utils/index';
import { IAnime } from 'anime/types';

@Injectable()
export class ListService {
  public lists: IList[] = [
    {
      id: 1,
      user_id: 1,
      current: [1234],
      planning: [],
      completed: [],
      paused: [],
      dropped: [],
    },
  ];

  findAll() {
    return this.lists;
  }

  async getFullList(list: IList) {
    const fullLists = new Map<string, IAnime[]>();

    for (const listKey of Object.keys(ListsEnum)) {
      try {
        const anime = await getAnimeList(list[listKey]);

        if (anime?.length > 0) {
          fullLists.set(listKey, anime);
        }
      } catch (error) {
        throw new Error(error);
      }
    }

    return { ...list, ...Object.fromEntries(fullLists) };
  }

  async findOne(id: number, full: boolean) {
    const [list] = getEntityById<IList>(id, this.lists);

    if (!list) {
      throw new HttpException(ErrorsEnum.listNotFound, HttpStatus.NOT_FOUND);
    }

    if (full) {
      return await this.getFullList(list);
    }

    return list;
  }

  async findByUser(id: number, full: boolean) {
    const list = this.lists.find((list) => list.user_id === id);

    if (!list) {
      throw new HttpException(ErrorsEnum.listByUserNotFound, HttpStatus.NOT_FOUND);
    }

    if (full) {
      return await this.getFullList(list);
    }

    return list;
  }

  create(createListDto: CreateListDto) {
    const newList = { id: Date.now(), ...createListDto };
    this.lists.push(newList);
    return newList;
  }

  update(id: number, updateListDto: UpdateListDto) {
    const [list, filterLists] = getEntityById<IList>(id, this.lists);

    if (!list) {
      throw new HttpException(ErrorsEnum.listNotFound, HttpStatus.NOT_FOUND);
    }

    const updatedList = { ...list, ...updateListDto };
    this.lists = [...filterLists, updatedList];
    return updatedList;
  }

  remove(id: number) {
    const [list, filterLists] = getEntityById<IList>(id, this.lists);

    if (!list) {
      throw new HttpException(ErrorsEnum.listNotFound, HttpStatus.NOT_FOUND);
    }

    this.lists = filterLists;
  }
}
