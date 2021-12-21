import React from 'react';
import { Button, Card, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Post } from '../../services/posts';

function PostItem({ post }: { post: Post }) {
  const navigate = useNavigate();

  return (
    <Container className="mt-5">
      <Card style={{ width: '100%' }}>
        <Card.Body>
          <Card.Title>{post.name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {new Date(post.createdAt).toLocaleDateString()}
          </Card.Subtitle>
          <Card.Text>{post.text.slice(0, 201)}...</Card.Text>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
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
