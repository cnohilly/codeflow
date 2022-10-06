import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Badge, Button } from 'react-bootstrap';

const Project = () => {
  return (
    <Col>
      <Card className="shadow">
        <Card.Header className="bg-black bg-gradient text-white">
          <Card.Title>
            Card Title
          </Card.Title>
          <Card.Subtitle className="text-white-50">
            Posted by randomuser on 10/06/22
          </Card.Subtitle>
        </Card.Header>
        <Card.Body>
          <div>
            <Badge bg="primary">HTML</Badge>{' '}
            <Badge bg="danger">CSS</Badge>{' '}
            <Badge bg="warning" text="dark">JavaScript</Badge>{' '}
            <Badge bg="success">React</Badge>{' '}
            <Badge bg="info">MERN</Badge>{' '}
          </div>
          <hr />
          <Card.Text>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
            Accusantium, et pariatur. Deserunt amet voluptatum necessitatibus 
            officiis placeat deleniti nobis ipsa velit inventore? 
            Veritatis id, ex impedit fugiat reprehenderit aspernatur facilis.
          </Card.Text>
          <div className="d-flex align-items-center justify-content-between">
            <Card.Link 
              href="#" 
              className="text-decoration-none text-muted"
            >
              # of comments
            </Card.Link>
            <div>
              <Button 
                href="#" 
                variant="primary" 
                className="me-3"
              >
                Go to project
              </Button>
              <Button 
                href="#"
                variant="primary"
              >
                Github
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Project;