import React from 'react';
import { Button, Card, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { deletePost, getPosts, Post } from '../../services/posts';

function PostItem({ post }: { post: Post }) {
  const navigate = useNavigate();
  const user = useAppSelector(state => state.user.user);
  const dispatch = useAppDispatch();

  const remove = async () => {
    await deletePost(post.id);
    await getPosts(dispatch);
  };

  console.log(post);
  return (
    <Container className="mt-5">
      <Card style={{ width: '100%' }}>
        <Card.Body>
          {post.fkUsersName === user?.name ? (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Card.Title>{post.name}</Card.Title>
              <Button
                variant="outline-dark"
                onClick={() => navigate('/posts/edit/' + post.id)}
              >
                Edit Post
              </Button>
            </div>
          ) : (
            <Card.Title>{post.name}</Card.Title>
          )}
          <Card.Subtitle className="mb-2 text-muted">
            {new Date(post.createdAt).toLocaleDateString()}
          </Card.Subtitle>
          <Card.Text>{post.text.slice(0, 201)}...</Card.Text>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {post.fkUsersName === user?.name ? (
              <Button
                variant="danger"
                onClick={() => {
                  remove();
                }}
              >
                Delete
              </Button>
            ) : (
              <span />
            )}
            <Button
              variant="outline-dark"
              onClick={() => navigate('/posts/' + post.id)}
            >
              Check post
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default PostItem;
