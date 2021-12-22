import { configureStore } from '@reduxjs/toolkit';
import movieListsReducer from './movies/movie-lists.reducer';
import moviesReducer from './movies/movies.reducer';
import postsReducer from './posts/posts.reducer';
import userReducer from './user/user.reducer';

export const store = configureStore({
  reducer: {
    movies: moviesReducer, 
    movieLists: movieListsReducer,
    user: userReducer,
    posts: postsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
