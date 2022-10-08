import React from 'react';
import { Row } from 'react-bootstrap';
import Project from '../Project';

const ProjectList = () => {

  return (
    <Row xs={1} className="g-4">
      <Project></Project>
      <Project></Project>
      <Project></Project>
    </Row>
  );
};

export default ProjectList;