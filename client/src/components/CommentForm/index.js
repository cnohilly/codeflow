import React, { useState } from 'react';
import { Card, Form, Button, FloatingLabel } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { ADD_COMMENT } from '../../utils/mutations';

const CommentForm = (props) => {

  const CHARACTER_MAX = 300;
  const {
    projectId,
    parentCommentId
  } = props;

  const [commentBody, setCommentBody] = useState('');

  // function to add comment
  const [addComment, { error }] = useMutation(ADD_COMMENT);

  const handleChange = async event => {
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
    <Card className="mt-3 bg-dark bg-gradient shadow">
      <Card.Body>
        <Form
          onSubmit={handleFormSubmit}
        >
          <Form.Group controlId="commentForm">
            {/* label */}
            {/* comment textarea */}
            <FloatingLabel
              controlId="comment-textarea"
              label="Add a comment"
              className="text-muted"
            >
              <Form.Control
                as="textarea"
                placeholder="Add a comment"
                style={{ height: '100px' }}
                className="bg-dark text-white"
                onChange={handleChange}
                value={commentBody}
              />
            </FloatingLabel>
          </Form.Group>
          <div className="d-flex justify-content-end mt-3">
            {/* comment button */}
            <Button
              variant="primary"
              type="submit"
              size="sm"
              className="rounded-pill"
            >
              Comment
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default CommentForm;