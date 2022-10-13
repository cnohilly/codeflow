import React from "react";
import { Card, Row } from "react-bootstrap";
import Project from "../Project";

const ProjectList = (props) => {
  const { projects } = props;
  if (!projects.length > 0) {
    return (
      <Row xs={1} className="gy-4">
        <Card className="dark-card-bg text-light shadow mb-3">
          <Card.Body>
            <h5>No projects to display.</h5>
          </Card.Body>
        </Card>
      </Row>
    )
  }

  return (
    <Row xs={1} className="gy-4">
      {projects.map((project) => {
        return <Project key={project._id} project={project} />;
      })}
    </Row>
  );
};

export default ProjectList;
