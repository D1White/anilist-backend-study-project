import { IsEnum, IsNumber, IsMongoId } from 'class-validator';
import { ListsEnum } from 'list/types';

export class AnimeActionDto {
  @IsNumber()
  id: number;

  @IsMongoId()
  list_id: string;

  @IsEnum(ListsEnum, {
    message: 'The list takes one of the values: current, planning, completed, paused, dropped',
  })
  list: ListsEnum;
}
