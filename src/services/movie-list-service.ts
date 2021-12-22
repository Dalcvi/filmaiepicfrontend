import axios from 'axios';
import { MovieItem } from '../components/movie-item';
import { AppDispatch } from '../store';
import { addMovieLists } from '../store/movies/movie-lists.reducer';
import { addMoviesInList } from '../store/movies/movie-lists.reducer';
import { addMovie } from '../store/movies/movie-lists.reducer';
import { Movie } from './imdb-api';

export interface MovieList {
  id: number;
  text: string;
  likes: number;
  dislikes: number;
  createdAt: Date;
  description: string;
  fkUsersName: string;
  listMovies: ListMovies[];
}

export interface ListMovies{
  id: number;
  fkMovieListId: number;
  fkMovieId: string;
}

// Call to the API to get the list of movielists
export const getMovieLists = async (dispatch: AppDispatch) => {
  const movieLists = await axios.get('http://localhost:5001/FilmaiOut/MovieLists');
  dispatch(addMovieLists(movieLists.data as MovieList[]));
};

export const getMoviesInList = async (dispatch: AppDispatch, listId: string) => {
  const movies = await axios.get(`http://localhost:5001/FilmaiOut/MovieLists/${listId}`);
  dispatch(addMoviesInList({id: listId, list: movies.data as ListMovies[]}));
};

export const getMovie = async (movieId: string) => {
  const movie = await axios.get(`http://localhost:5001/FilmaiOut/MovieLists/movie/${movieId}`);
  return movie.data as Movie;
};