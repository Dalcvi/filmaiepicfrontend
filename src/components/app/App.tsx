import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoginPage } from '../login-page';
import { MoviesPage } from '../movies-page';
import { NavigationBar } from '../navigation-bar';
import PostsPage from '../posts-page/posts-page';
import PostPage from '../post-page/post-page';
import ProfilePage from '../profile-page/profile-page';
import { RegisterPage } from '../register-page';

export function App() {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="/posts" element={<PostsPage />} />
        <Route path="/posts/:postId" element={<PostPage />} />
        <Route path="/" element={<MoviesPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
}
