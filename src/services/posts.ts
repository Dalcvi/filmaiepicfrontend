import axios from 'axios';
import { AppDispatch } from '../store';
import { addPosts } from '../store/posts/posts.reducer';

export interface Post {
  id: number;
  name: string;
  createdAt: string;
  text: string;
  likes: number;
  dislikes: number;
  views: number;
  lastEditedAt: string;
  fkUsersName: string;
  comments: [];
}

export const getPosts = async (dispatch: AppDispatch) => {
  const posts = await axios.get('https://localhost:5001/FilmaiOut/Posts');
  dispatch(addPosts(posts.data as Post[]));
};
