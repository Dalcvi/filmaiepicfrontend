import axios from 'axios';

export interface Comment {
  id: number;
  text: string;
  createdAt: string;
  fkUsersName: string;
}

export const postComment = async (
  postId: number,
  text: string,
  name: string,
) => {
  await axios.post(
    `http://localhost:5001/FilmaiOut/Posts/post/${postId}/comment`,
    {
      text,
      name,
    },
  );
};

export const getComments = async (postId: number) => {
  return await axios
    .get(`http://localhost:5001/FilmaiOut/Posts/post/${postId}/comment`)
    .then(response => {
      console.log('COMMENTS', response);
      return response.data as Comment[];
    });
};

export const deleteComment = async (commentId: number, postId: number) => {
  await axios.delete(
    `http://localhost:5001/FilmaiOut/Posts/post/${postId}/comment/${commentId}`,
  );
};
