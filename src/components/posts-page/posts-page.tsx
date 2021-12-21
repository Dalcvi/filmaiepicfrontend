import React, { useEffect, useState } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { getPosts } from '../../services/posts';
import PostItem from '../post-item/post-item';
import styles from './posts-page.module.css';

function PostsPage() {
  const dispatch = useAppDispatch();
  const [showLoader, setShowLoader] = useState(false);
  const posts = useAppSelector(state => state.posts.posts);
  const location = useLocation();
  console.log(location.pathname);

  useEffect(() => {
    if (posts.length == 0) {
      setShowLoader(true);
      const gettingPosts = async () => {
        await getPosts(dispatch);
        setShowLoader(false);
      };
      gettingPosts();
    }
  }, [dispatch, posts]);

  if (showLoader)
    return (
      <Container className={styles.spinnerCenter}>
        <Spinner animation={'border'} />
      </Container>
    );

  return (
    <div>
      {posts.map(post => (
        <PostItem post={post} />
      ))}
    </div>
  );
}

export default PostsPage;
