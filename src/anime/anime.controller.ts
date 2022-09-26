import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AnimeService } from './anime.service';
import { AnimeActionDto } from './dto/anime-action.dto';

@Controller('anime')
export class AnimeController {
  constructor(private readonly animeService: AnimeService) {}

  @Post()
  @HttpCode(HttpStatus.NO_CONTENT)
  addOrMove(@Body() animeActionDto: AnimeActionDto) {
    return this.animeService.addOrMove(animeActionDto);
  }
}
