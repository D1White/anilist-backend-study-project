import { IsEnum, IsNumber } from 'class-validator';
import { ListsEnum } from 'list/types';

export class AnimeActionDto {
  @IsNumber()
  id: number;

  @IsNumber()
  list_id: number;

  @IsEnum(ListsEnum, {
    message: 'The list takes one of the values: current, planning, completed, paused, dropped',
  })
  list: ListsEnum;
}
