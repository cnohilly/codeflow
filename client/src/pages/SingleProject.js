import React from 'react';
import { Container, Row } from 'react-bootstrap';
import Project from '../components/Project';
import Comment from '../components/Comment';
import CommentForm from '../components/CommentForm';
import ReplyForm from '../components/ReplyForm';
import ProjectForm from '../components/ProjectForm';

const SingleProject = () => {

  return (
    <Container id="single-project" className="py-4 ">
      <Row xs={1} >
        {/* single project */}
        <Project></Project>
      </Row>

      {/* comment form */}
      <CommentForm />

      <hr className="border border-white"/>

      {/* comment list */}
      <div>
        <Row xs={1} className="g-4">
          {/* .map() */}
          <Comment />
          <ReplyForm />
          <Comment />
          <Comment />
          <Comment />
        </Row>
      </div>
    </Container>
  );
};

export default SingleProject;