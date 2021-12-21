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
import {
  getComments,
  postComment,
  Comment,
  deleteComment,
} from '../../services/comments';
import { getPosts } from '../../services/posts';
import CommentList from '../comment-list/comment-list';
import styles from './post-page.module.css';

function PostsPage() {
  const dispatch = useAppDispatch();
  const [showLoader, setShowLoader] = useState(false);
  const state = useAppSelector(state => state);
  const posts = state.posts.posts;
  const user = state.user.user;
  const params = useParams();
  const navigate = useNavigate();
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);
  console.log(params);
  const post = posts.find(post => post.id === Number(params['postId']));

  useEffect(() => {
    const commentGetter = async () => {
      const fetchedComments = await getComments(Number(params['postId'] ?? 0));
      setComments(fetchedComments);
    };
    commentGetter();
  }, [params]);

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

  const remove = async (commentId: number, postId: number) => {
    await deleteComment(commentId, postId);
    const fetchedComments = await getComments(Number(params['postId'] ?? 0));
    setComments(fetchedComments);
  };

  const onSubmit = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    await postComment(Number(params['postId']) ?? 0, comment, user?.name ?? '');
    setComment('');
    const fetchedComments = await getComments(Number(params['postId'] ?? 0));
    setComments(fetchedComments);
  };

  return (
    <Container className="mt-5" onSubmit={e => onSubmit(e)}>
      <Card style={{ width: '100%' }}>
        <Card.Body>
          <Card.Title>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>{post?.name}</span>
              <span>{post?.fkUsersName}</span>
            </div>
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {new Date(post?.createdAt ?? '').toLocaleDateString()}
          </Card.Subtitle>
          <Card.Text>{post?.text}</Card.Text>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}></div>
        </Card.Body>
      </Card>
      {comments.length > 0 && <hr />}
      <CommentList
        comments={comments}
        post={post}
        user={user}
        remove={remove}
      />
      {user && (
        <>
          <hr />
          <Form className="mt-3">
            <FloatingLabel controlId="floatingTextarea2" label="Comment">
              <Form.Control
                className={styles.textarea}
                as="textarea"
                placeholder="Leave a comment here"
                style={{ height: '150px' }}
                value={comment}
                onChange={e => setComment(e.target.value)}
                required
              />
            </FloatingLabel>
            <div className={styles.rightSideButton}>
              <Button type="submit" variant="dark">
                Submit
              </Button>
            </div>
          </Form>
        </>
      )}
    </Container>
  );
}

export default PostsPage;
