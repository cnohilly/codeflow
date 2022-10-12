import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Project from '../components/Project';
import CommentForm from '../components/CommentForm';
import CommentList from '../components/CommentList';
import { useQuery } from '@apollo/client';
import { QUERY_PROJECT } from '../utils/queries';

const SingleProject = () => {
  const { id: projectId } = useParams();

  const { loading, data } = useQuery(QUERY_PROJECT, {
    variables: { id: projectId }
  });
  const project = data?.project || {};

  if (loading) {
    return <div>Loading Project</div>
  }

  return (
    <Container id="single-project" className="py-4">
      <Row xs={1} >
        {/* single project */}
        <Project project={project} />
      </Row>

      {/* if user is logged in, render comment form */}
      <CommentForm projectId={projectId} />


      <hr className="border border-white" />

      {/* container for comments list */}
      <CommentList comments={project.comments} includeReplies={true} />

    </Container>
  );
};

export default SingleProject;