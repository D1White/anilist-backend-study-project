import { IsNumberString, IsBooleanString, IsOptional, IsMongoId } from 'class-validator';

export class FindOneParams {
  @IsNumberString()
  id: number;
}

export class FindOneMongoParams {
  @IsMongoId()
  id: string;
}

export class ListQuery {
  @IsOptional()
  @IsBooleanString()
  full: string;
}
