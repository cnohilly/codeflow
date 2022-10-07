import React from 'react';
import { Container, Row, Card, Form, Button, FloatingLabel } from 'react-bootstrap';
import Project from '../components/Project';

const SingleProject = () => {

  return (
    <Container id="single-project" className="py-4 ">
      <Row xs={1} >
        {/* single project */}
        <Project></Project>
      </Row>
      {/* comment form */}
      <Card className="mt-3 bg-dark bg-gradient">
        <Card.Body>
          <Form>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              {/* label */}
              <FloatingLabel 
                controlId="floatingTextarea2" 
                label="Add a comment"
                className="text-muted"
              >
                {/* comment textarea */}
                <Form.Control
                  id="comment-textarea"
                  as="textarea"
                  placeholder="Leave a comment here"
                  style={{ height: '100px' }}
                  className="bg-dark text-white"
                />
              </FloatingLabel>
            </Form.Group>
            <div className="d-flex justify-content-end mt-3">
              <Button variant="primary" type="submit">
                Comment
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
      <hr className="border border-white"/>
      {/* comment list */}
      <div>

      </div>
    </Container>
  );
};

export default SingleProject;