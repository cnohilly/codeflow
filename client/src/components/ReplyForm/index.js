import React from 'react';
import { Col, Card, Form, Button, FloatingLabel } from 'react-bootstrap';

const ReplyForm = () => {
  
  return (
    // reply form card
    <Col>
      <Card className="bg-dark bg-gradient shadow">
        <Card.Body>
          <Form>
            <Form.Group controlId="replyForm">
              {/* label */}
              <FloatingLabel 
                controlId="floatingTextarea" 
                label="Add a reply"
                className="text-muted"
              >
                {/* reply textarea */}
                <Form.Control
                  id="reply-textarea"
                  as="textarea"
                  placeholder="Add a reply"
                  style={{ height: '100px' }}
                  className="bg-dark text-white"
                />
              </FloatingLabel>
            </Form.Group>
            <div className="d-flex justify-content-end mt-3">
              {/* reply button */}
              <Button variant="primary" type="submit" size="sm" className="rounded-pill px-4 me-2">
                Reply
              </Button>
              {/* cancel button */}
              <Button variant="danger" type="button" size="sm" className="rounded-pill px-3">
                Cancel
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default ReplyForm;