import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AnimeService } from './anime.service';
import { AnimeActionDto } from './dto/anime-action.dto';
import { AnimeAclGuard } from './guards/anime-acl.guard';
import { JwtAuthGuard } from 'auth/guards';

@Controller('anime')
export class AnimeController {
  constructor(private readonly animeService: AnimeService) {}

  @UseGuards(JwtAuthGuard, AnimeAclGuard)
  @Post()
  @HttpCode(HttpStatus.NO_CONTENT)
  addOrMove(@Body() animeActionDto: AnimeActionDto) {
    return this.animeService.addOrMove(animeActionDto);
  }
}
