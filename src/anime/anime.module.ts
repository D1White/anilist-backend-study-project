import { Module } from '@nestjs/common';
import { AnimeService } from './anime.service';
import { AnimeController } from './anime.controller';
import { ListModule } from 'list/list.module';

@Module({
  controllers: [AnimeController],
  providers: [AnimeService],
  imports: [ListModule],
})
export class AnimeModule {}
