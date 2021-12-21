import axios from 'axios';
import { AppDispatch } from '../store';
import { addMovies } from '../store/movies/movies.reducer';

export interface Movie {
  id: string;
  rank: string;
  title: string;
  fullTilte: String;
  year: string;
  image: string;
  crew: string;
  imDbRating: string;
  imDbRatingCount: string;
}

export interface SearchedMovie {
  id: string;
  description: string;
  image: string;
  title: string;
}

export const getTopMovies = async (dispatch: AppDispatch) => {
  axios
    .get('https://imdb-api.com/en/API/Top250Movies/k_v6qrphs8')
    .then(response => {
      const movies = response.data.items as Movie[];
      dispatch(addMovies(movies));
    });
};

export const searchForMovie = async (movieName: string) => {
  return axios
    .get('https://imdb-api.com/en/API/SearchMovie/k_v6qrphs8/' + movieName)
    .then(response => {
      return response.data.results
        ? (response.data.results as SearchedMovie[])
        : [];
    });
};
