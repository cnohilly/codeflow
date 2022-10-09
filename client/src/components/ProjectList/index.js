import React from "react";
import { Row } from "react-bootstrap";
import Project from "../Project";

const ProjectList = (props) => {
  const { projects } = props;

  // console.log(projects);

  return (
    <Row xs={1} className="g-4">
      {projects.map((project) => {
        return <Project key={project._id} project={project} />;
      })}
    </Row>
  );
};

export default ProjectList;
