import React from 'react';
import { Col, Card, Badge } from 'react-bootstrap';

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
          <Card.Link href="#" className="text-decoration-none text-muted">
            # of comments
          </Card.Link>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Project;