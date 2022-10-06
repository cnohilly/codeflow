import React from 'react';
import { Container, Row } from 'react-bootstrap';
import Project from '../components/Project';

const Home = () => {

  return (
    // section for Homepage
    <div id="home" className="scroll-margin">
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
          {/* list of projects on homepage */}
          <Project></Project>
          
          <Project></Project>
          
          <Project></Project>
        </Row>
      </Container>
    </div>
  );
};

export default Home;