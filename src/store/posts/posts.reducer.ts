import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '..';
import { Post } from '../../services/posts';

// Define a type for the slice state
interface PostsState {
  posts: Post[];
}

// Define the initial state using that type
const initialState: PostsState = {
  posts: [],
};

export const postsSlice = createSlice({
  name: 'posts',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = [...state.posts, ...action.payload];
    },
  },
});

export const { addPosts } = postsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectMovies = (state: RootState) => state.movies.movies;

export default postsSlice.reducer;
