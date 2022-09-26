import { request } from 'undici';
import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorsEnum } from './errors';
import { IAnimeRes, IAnime } from 'anime/types';

export const getAnimeById = async (id: number): Promise<IAnime> => {
  const { statusCode, body } = await request(`https://api.jikan.moe/v4/anime/${id}`);

  if (statusCode === HttpStatus.TOO_MANY_REQUESTS) {
    throw new HttpException(ErrorsEnum.animeApiManyReq, statusCode);
  } else if (statusCode !== HttpStatus.OK) {
    throw new HttpException(ErrorsEnum.animeApi, statusCode);
  }

  const { data }: IAnimeRes = await body.json();

  if (!data) {
    throw new HttpException(ErrorsEnum.animeApi, HttpStatus.INTERNAL_SERVER_ERROR);
  }

  const genres = data.genres.map((genre) => genre.name);

  const anime: IAnime = {
    id: data.mal_id,
    title: data.title,
    season: data.season,
    year: data.year,
    image: data.images.jpg.image_url,
    synopsis: data.synopsis,
    genres,
    status: data.status,
  };

  return anime;
};

export const getAnimeList = async (ids: number[]): Promise<IAnime[]> => {
  const animeRequests = ids.map((animeId) => getAnimeById(animeId));
  try {
    return Promise.all(animeRequests);
  } catch (error) {
    throw new Error(error);
  }
};
