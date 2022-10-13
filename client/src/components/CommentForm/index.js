import React, { useState } from 'react';
import { Card, Form, Button, FloatingLabel } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { QUERY_COMMENT, QUERY_PROJECT } from '../../utils/queries';
import { ADD_COMMENT } from '../../utils/mutations';
import Auth from '../../utils/auth';

const CommentForm = (props) => {

  const CHARACTER_MAX = 300;
  const {
    projectId,
    parentCommentId = false,
    toggleReplyForm,
    displayChildren
  } = props;

  const [commentBody, setCommentBody] = useState('');

  // function to add comment
  const [addComment] = useMutation(ADD_COMMENT, {
    update(cache, { data: { addComment } }) {
      try {
        if (parentCommentId) {
          const { comment } = cache.readQuery({
            query: QUERY_COMMENT,
            variables: { id: parentCommentId }
          });
          cache.writeQuery({
            query: QUERY_COMMENT,
            data: { comment: { ...comment, comments: [...comment.comments, addComment], commentCount: comment.comments.length + 1 } }
          });

          toggleReplyForm();
          displayChildren();
        } else {
          const { project } = cache.readQuery({
            query: QUERY_PROJECT,
            variables: { id: projectId }
          });
          cache.writeQuery({
            query: QUERY_PROJECT,
            data: { project: { ...project, comments: [...project.comments, addComment] } }
          });
        }
      } catch (err) {
        console.warn(err);
      }
    }
  });


  const handleChange = event => {
    if (event.target.value.length <= CHARACTER_MAX) {
      setCommentBody(event.target.value);
    }
  }
  const handleFormSubmit = async event => {
    event.preventDefault();

    try {
      const params = parentCommentId ? { projectId, parentCommentId } : { projectId };

      await addComment({
        variables: { ...params, commentBody }
      });

      setCommentBody('');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    // comment form card
    <Card className="mt-3 dark-card-bg shadow">
      <Card.Body>
        <Form
          onSubmit={handleFormSubmit}
        >
          <Form.Group controlId="commentForm">
            {/* label */}
            {/* comment textarea */}
            <FloatingLabel
              controlId="comment-textarea"
              label={Auth.loggedIn()
                ? (!parentCommentId ? "Add a comment" : "Add a reply")
                : "Please log in to leave a comment."}
              className={"text-muted"}
            >
              <Form.Control
                as="textarea"
                placeholder="Add a comment"
                style={{ height: '100px' }}
                className="bg-dark text-white"
                onChange={handleChange}
                value={commentBody}
                disabled={!Auth.loggedIn()}
              />
            </FloatingLabel>
          </Form.Group>
          {Auth.loggedIn() &&
            <div className="d-flex justify-content-end mt-3">
              {/* comment button */}
              <Button
                variant="success"
                type="submit"
                size="sm"
                className="rounded-pill px-3 fw-bold"
              >
                {!parentCommentId ? "Comment" : "Reply"}
              </Button>
              {parentCommentId &&
                <Button
                  variant="danger"
                  type="button"
                  size="sm"
                  className="rounded-pill px-3 ms-2 fw-bold"
                  onClick={toggleReplyForm}
                >
                  Cancel
                </Button>
              }
            </div>
          }
          {/* cancel button */}
        </Form>
      </Card.Body>
    </Card>
  );
};

export default CommentForm;