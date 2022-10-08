import React from 'react';
import { Container, Row } from 'react-bootstrap';
import Project from '../components/Project';
// import Comment from '../components/Comment';
import CommentForm from '../components/CommentForm';
import CommentList from '../components/CommentList';

const SingleProject = () => {

  return (
    <Container id="single-project" className="py-4 ">
      <Row xs={1} >
        {/* single project */}
        <Project />
      </Row>

      {/* if user is logged in, render comment form */}
      <CommentForm />

      <hr className="border border-white"/>
      
      {/* container for comments list */}
      <CommentList />

    </Container>
  );
};

export default SingleProject;