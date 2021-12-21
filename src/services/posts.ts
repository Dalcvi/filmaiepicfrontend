import axios from 'axios';

// export interface

export const getPosts = async () => {
  await axios.get('https://localhost:5001/FilmaiOut/Posts');
};
