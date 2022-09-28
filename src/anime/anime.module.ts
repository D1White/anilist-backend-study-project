import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { List, ListSchema } from 'list/schemas/list.schema';
import { AnimeService } from './anime.service';
import { AnimeController } from './anime.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: List.name, schema: ListSchema }])],
  controllers: [AnimeController],
  providers: [AnimeService],
})
export class AnimeModule {}
