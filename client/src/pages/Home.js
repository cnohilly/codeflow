import React from 'react';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';

const Home = () => {

  return (
    // section for Homepage
    <div id="home">
      {/* section for hero */}
      <section id="hero" className="py-4 py-md-5 text-center bg-dark text-white">
        <div className="py-md-5">
          <h1 className="display-1 fw-semibold">Centered hero</h1>
          <h2>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</h2>
        </div>
      </section>
      {/* container for project card list */}
      <Container id="home-project-list" className="py-4 ">
        <Row xs={1} className="g-4">
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
        </Row>
      </Container>
    </div>
  );
};

export default Home;