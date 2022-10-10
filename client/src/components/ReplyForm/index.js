import React from 'react';
import { Card, Form, Button, FloatingLabel } from 'react-bootstrap';

const ReplyForm = (props) => {
  const { displayReplyForm, setDisplayReplyForm } = props
  
  return (
    // reply form card
    <Card id="replyForm" className="bg-dark bg-gradient shadow mt-3">
      <Card.Body>
        <Form>
          <Form.Group controlId="replyTextarea">
            {/* label */}
            <FloatingLabel 
              controlId="reply-textarea" 
              label="Add a reply"
              className="text-muted"
            >
              {/* reply textarea */}
              <Form.Control
                as="textarea"
                autoFocus
                placeholder="Add a reply"
                style={{ height: '100px' }}
                className="bg-dark text-white"
              />
            </FloatingLabel>
          </Form.Group>
          <div className="d-flex justify-content-end mt-3">
            {/* reply button */}
            <Button 
              variant="primary" 
              type="button" 
              size="sm" 
              className="rounded-pill px-3 me-2"
              onClick={() => console.log("Replied!")}
            >
              Reply
            </Button>
            {/* cancel button */}
            <Button 
              variant="danger" 
              type="button" 
              size="sm" 
              className="rounded-pill px-3"
              onClick={() => setDisplayReplyForm(!displayReplyForm)}
            >
              Cancel
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default ReplyForm;