import { IsNumberString, IsBooleanString, IsOptional } from 'class-validator';

export class FindOneParams {
  @IsNumberString()
  id: number;
}

export class ListQuery {
  @IsOptional()
  @IsBooleanString()
  full: string;
}
