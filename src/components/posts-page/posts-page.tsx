import React, { useEffect, useState } from 'react';
import { Button, Container, Spinner } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { getPosts } from '../../services/posts';
import PostItem from '../post-item/post-item';
import styles from './posts-page.module.css';

function PostsPage() {
  const dispatch = useAppDispatch();
  const [showLoader, setShowLoader] = useState(false);
  const navigate = useNavigate();
  const state = useAppSelector(state => state);
  const posts = state.posts.posts;
  const user = state.user.user;
  const location = useLocation();

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
    <Container style={{ marginBottom: '100px' }}>
      {user && (
        <>
          <div
            className="mt-5"
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginRight: '15px',
            }}
          >
            <Button onClick={() => navigate('/posts/creation')} variant="dark">
              Create post
            </Button>
          </div>
          <hr />
        </>
      )}
      {posts.map(post => (
        <PostItem post={post} />
      ))}
    </Container>
  );
}

export default PostsPage;
