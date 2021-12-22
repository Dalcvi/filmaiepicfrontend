import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../';
import { Movie } from '../../services/imdb-api';
import { ListMovies, MovieList } from '../../services/movie-list-service';

// Define a type for the slice state
interface MovieListsState {
  movieLists: MovieList[];
  moviesInList: {[key:string]: ListMovies[]};
  movie: Movie;
}

interface MovieListItem {
  list: ListMovies[];
  id: string;
}

// Define the initial state using that type
const initialState: MovieListsState = {
  movieLists: [],
  moviesInList: {} as {[key:string]: ListMovies[]},
  movie: {} as Movie,
};

export const movieListsSlice = createSlice({
  name: 'movieLists',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addMovieLists: (state, action: PayloadAction<MovieList[]>) => {
      state.movieLists = [...state.movieLists, ...action.payload];
    },
    addMoviesInList: (state, action: PayloadAction<MovieListItem>) => {
      state.moviesInList = {...state.moviesInList, [action.payload.id]: action.payload.list};
    },
    addMovie: (state, action: PayloadAction<Movie>) => {
      state.movie = action.payload;
    },
  },
});

export const { addMovieLists } = movieListsSlice.actions;
export const { addMoviesInList } = movieListsSlice.actions;
export const { addMovie } = movieListsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectMovieLists = (state: RootState) => state.movieLists.movieLists;
export const selectMoviesInList = (state: RootState) => state.movieLists.moviesInList;
export const selectMovie = (state: RootState) => state.movieLists.movie;

export default movieListsSlice.reducer;
