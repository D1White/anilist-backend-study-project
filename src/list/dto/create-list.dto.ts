import { IsMongoId, IsArray } from 'class-validator';

export class CreateListDto {
  @IsMongoId()
  user_id: number;

  @IsArray()
  current: number[];

  @IsArray()
  planning: number[];

  @IsArray()
  completed: number[];

  @IsArray()
  paused: number[];

  @IsArray()
  dropped: number[];
}
