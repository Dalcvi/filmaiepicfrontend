import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../';
import { Movie } from '../../services/imdb-api';

// Define a type for the slice state
interface MoviesState {
  movies: Movie[];
}

// Define the initial state using that type
const initialState: MoviesState = {
  movies: [],
};

export const moviesSlice = createSlice({
  name: 'movies',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addMovies: (state, action: PayloadAction<Movie[]>) => {
      state.movies = [...state.movies, ...action.payload];
    },
  },
});

export const { addMovies } = moviesSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectMovies = (state: RootState) => state.movies.movies;

export default moviesSlice.reducer;
