import axios from 'axios';

export interface User {
  name: string;
  email: string;
  age: number;
  administrator: boolean;
  createdAt: string;
  lastLoginAt: string;
  comments: [];
  movieLists: [];
  movieReports: [];
  movieReviews: [];
  posts: [];
  subtitleLists: [];
}

export const login = async (email: string, password: string) => {
  return await axios
    .post('http://localhost:5001/FilmaiOut/Auth/login', {
      Email: email,
      PasswordHash: password,
    })
    .then(response => {
      return response.data as User;
    })
    .catch(e => {
      return;
    });
};

export const register = async (
  email: string,
  password: string,
  name: string,
  age: number,
) => {
  return await axios
    .post('http://localhost:5001/FilmaiOut/Auth/register', {
      email,
      passwordHash: password,
      name,
      age,
    })
    .then(response => {
      return response.data;
    })
    .catch(e => {
      return;
    });
};

export const deleteAccount = async (name: string) => {
  console.log('HELLO');
  await axios.delete('http://localhost:5001/FilmaiOut/Auth?name=' + name);
};
