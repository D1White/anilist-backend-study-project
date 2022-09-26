import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { ListModule } from './list/list.module';
import { AnimeModule } from './anime/anime.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    ListModule,
    AnimeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
