import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Container,
  FloatingLabel,
  Form,
  Spinner,
} from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { getPosts } from '../../services/posts';
import styles from './post-page.module.css';

function PostsPage() {
  const dispatch = useAppDispatch();
  const [showLoader, setShowLoader] = useState(false);
  const posts = useAppSelector(state => state.posts.posts);
  const params = useParams();
  const navigate = useNavigate();
  console.log(params);
  const post = posts.find(post => post.id === Number(params['postId']));

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

  if (!post && showLoader === false) {
    navigate('/posts');
  }

  if (showLoader)
    return (
      <Container className={styles.spinnerCenter}>
        <Spinner animation={'border'} />
      </Container>
    );

  // const onSubmit = () => {

  // }

  return (
    <Container className="mt-5">
      <Card style={{ width: '100%' }}>
        <Card.Body>
          <Card.Title>{post?.name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {new Date(post?.createdAt ?? '').toLocaleDateString()}
          </Card.Subtitle>
          <Card.Text>{post?.text.slice(0, 201)}...</Card.Text>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}></div>
        </Card.Body>
      </Card>
      <hr />
      <Form className="mt-3">
        <FloatingLabel controlId="floatingTextarea2" label="Comment">
          <Form.Control
            className={styles.textarea}
            as="textarea"
            placeholder="Leave a comment here"
            style={{ height: '150px' }}
          />
        </FloatingLabel>
        <div className={styles.rightSideButton}>
          <Button type="submit" variant="dark">
            Submit
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default PostsPage;
