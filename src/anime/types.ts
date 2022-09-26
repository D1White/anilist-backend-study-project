export interface IAnime {
  id: number;
  title: string;
  season: string;
  year: number;
  image: string;
  synopsis: string;
  genres: string[];
  status: string;
}

export interface IAnimeRes {
  data: {
    mal_id: number;
    url: string;
    images: {
      jpg: IAnimeImageRes;
      webp?: IAnimeImageRes;
    };
    trailer: {
      youtube_id: string;
      url: string;
      embed_url: string;
    };
    approved: true;
    title: string;
    title_english: string;
    title_japanese: string;
    title_synonyms: string[];
    type: 'TV';
    source: string;
    episodes: number;
    status: string;
    airing: true;
    duration: string;
    rating: string;
    score: number;
    scored_by: number;
    rank: number;
    popularity: number;
    members: number;
    favorites: number;
    synopsis: string;
    background: string;
    season: 'summer';
    year: number;
    genres: IAnimeGenreRes[];
  };
}

interface IAnimeImageRes {
  image_url: string;
  small_image_url: string;
  large_image_url: string;
}

interface IAnimeGenreRes {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}
