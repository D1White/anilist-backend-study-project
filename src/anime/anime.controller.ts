import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards, Inject } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { JwtAuthGuard } from 'auth/guards';
import { AnimeService } from './anime.service';
import { AnimeActionDto } from './dto/anime-action.dto';
import { AnimeAclGuard } from './guards/anime-acl.guard';

@Controller('anime')
export class AnimeController {
  constructor(
    private readonly animeService: AnimeService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  @UseGuards(JwtAuthGuard, AnimeAclGuard)
  @Post()
  @HttpCode(HttpStatus.NO_CONTENT)
  addOrMove(@Body() animeActionDto: AnimeActionDto) {
    this.logger.info(`anime-controller addOrMove`);
    return this.animeService.addOrMove(animeActionDto);
  }
}
