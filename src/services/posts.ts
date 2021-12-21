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

export const createPost = async (
  text: string,
  name: string,
  userName: string,
) => {
  await axios.post('https://localhost:5001/FilmaiOut/Posts/post', {
    text,
    name,
    userName,
  });
};

export const updatePost = async (
  text: string,
  title: string,
  postId: Number,
) => {
  await axios.put('https://localhost:5001/FilmaiOut/Posts/post', {
    text,
    title,
    postId,
  });
};

export const deletePost = async (postId: number) => {
  await axios.delete('https://localhost:5001/FilmaiOut/Posts/post/' + postId);
};
