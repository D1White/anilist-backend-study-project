import { HttpException, HttpStatus, Injectable, Inject } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { ListService } from 'list/list.service';
import { ListsEnum } from 'list/types';
import { ErrorsEnum } from 'utils/errors';
import { AnimeActionDto } from './dto/anime-action.dto';

@Injectable()
export class AnimeService {
  constructor(
    private listService: ListService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  async addOrMove({ id, list_id, list }: AnimeActionDto) {
    const currentList = await this.listService.listModel.findById(list_id).exec();

    if (!currentList) {
      this.logger.warn(`[${HttpStatus.NOT_FOUND}] anime-service addOrMove`);
      throw new HttpException(ErrorsEnum.notFound, HttpStatus.NOT_FOUND);
    }

    const filterList = new Map<string, number[]>();

    Object.keys(ListsEnum).forEach((listKey) => {
      const filtredAnime = currentList[listKey].filter((animeId) => animeId !== id);
      filterList.set(listKey, filtredAnime);
    });

    filterList.set(list, [...filterList.get(list), id]);

    this.logger.info(`anime-service addOrMove`);
    return this.listService.listModel
      .findByIdAndUpdate(list_id, Object.fromEntries(filterList), { new: true })
      .exec();
  }
}
