import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { Comment, deleteComment, getComments } from '../../services/comments';
import { Post } from '../../services/posts';
import { User } from '../../services/user-services';

function CommentList({
  comments,
  post,
  user,
  remove,
}: {
  comments: Comment[];
  post: Post | undefined;
  user: User | null;
  remove: (commentId: number, postId: number) => Promise<void>;
}) {
  return (
    <>
      {comments.map(comment => {
        return (
          <Card style={{ width: '90%', marginLeft: '10%', marginTop: '15px' }}>
            <Card.Body>
              <Card.Title>{comment.fkUsersName}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {new Date(comment.createdAt).toLocaleDateString()}
              </Card.Subtitle>
              <Card.Text>{comment.text}</Card.Text>
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                {user?.name === post?.fkUsersName && (
                  <Button
                    variant="danger"
                    onClick={() => remove(comment.id, post?.id ?? 0)}
                  >
                    Delete
                  </Button>
                )}
              </div>
            </Card.Body>
          </Card>
        );
      })}
    </>
  );
}

export default CommentList;
