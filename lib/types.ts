export interface Movie {
  id: number;
  title: string;
  release_date: string;
  poster_path?: string;
  overview: string;
  vote_average: number;
  vote_count: number;
}

type MovieGenre = {
  id: number;
  name: string;
};

export interface MovieDetails extends Movie {
  backdrop_path?: string;
  genres: MovieGenre[];
  homepage: string;
  original_language: string;
  runtime: number;
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string;
}

export type ActionResponse = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
  error?: string;
  inputs?: Record<string, string>;
};

export const userSignUpOrIninitialState: ActionResponse = {
  success: false,
  message: "",
  errors: undefined,
};
