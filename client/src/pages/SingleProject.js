import React from 'react';
import { Container, Row } from 'react-bootstrap';
import Project from '../components/Project';
import CommentForm from '../components/CommentForm';
import CommentList from '../components/CommentList';

const SingleProject = () => {

  return (
    <Container id="single-project" className="py-4 ">
      <Row xs={1} >
        {/* single project */}
        <Project />
      </Row>

      {/* comment form */}
      <CommentForm />

      <hr className="border border-white"/>

      {/* comment list */}
      <CommentList />

    </Container>
  );
};

export default SingleProject;