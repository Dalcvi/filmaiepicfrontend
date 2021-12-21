import React, { useEffect, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { createPost, getPosts, updatePost } from '../../services/posts';

function PostCreation() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const params = useParams();
  const state = useAppSelector(state => state);
  const posts = state.posts.posts;
  const user = state.user.user;
  if (!user) {
    navigate('/posts');
  }

  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  useEffect(() => {
    if (params['postId']) {
      const post = posts.find(post => post.id === Number(params['postId']));
      if (!post) {
        navigate('/posts');
      }
      setTitle(post?.name ?? '');
      setText(post?.text ?? '');
    }
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (params['postId']) {
      await updatePost(text, title, Number(params['postId']));
    } else {
      await createPost(text, title, user?.name ?? '');
    }
    await getPosts(dispatch);
    navigate('/posts');
  };

  return (
    <Container style={{ maxWidth: '968px' }}>
      <Button
        className="mt-5"
        onClick={() => navigate('/posts')}
        variant="outline-dark"
      >
        Back
      </Button>
      <Form className="mt-4" onSubmit={e => onSubmit(e)}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Title</Form.Label>
          <Form.Control
            value={title}
            onChange={e => setTitle(e.target.value)}
            type="text"
            placeholder="Title..."
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Post</Form.Label>
          <Form.Control
            value={text}
            onChange={e => setText(e.target.value)}
            style={{ resize: 'none' }}
            as="textarea"
            rows={8}
            required
          />
        </Form.Group>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button type="submit" variant="dark">
            {params['postId'] ? 'Edit post' : 'Create post'}
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default PostCreation;
