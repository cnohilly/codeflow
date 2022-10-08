import React from 'react';
import { Card, Form, Button, FloatingLabel } from 'react-bootstrap';

const CommentForm = () => {
  
  return (
    // comment form card
    <Card className="mt-3 bg-dark bg-gradient shadow">
      <Card.Body>
        <Form>
          <Form.Group controlId="commentForm">
            {/* label */}
            <FloatingLabel 
              controlId="comment-textarea" 
              label="Add a comment"
              className="text-muted"
            >
              {/* comment textarea */}
              <Form.Control
                as="textarea"
                placeholder="Add a comment"
                style={{ height: '100px' }}
                className="bg-dark text-white"
              />
            </FloatingLabel>
          </Form.Group>
          <div className="d-flex justify-content-end mt-3">
            {/* comment button */}
            <Button variant="primary" type="submit" size="sm" className="rounded-pill">
              Comment
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default CommentForm;