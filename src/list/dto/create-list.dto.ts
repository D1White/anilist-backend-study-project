import { IsNumber } from 'class-validator';

export class CreateListDto {
  @IsNumber()
  user_id: number;

  current: number[];
  planning: number[];
  completed: number[];
  paused: number[];
  dropped: number[];
}
