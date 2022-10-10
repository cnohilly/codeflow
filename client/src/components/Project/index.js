import React from 'react';
// import { Link } from 'react-router-dom';
import { Col, Card, Badge, Button } from 'react-bootstrap';

const Project = (props) => {

  const {
    project
  } = props;

  return (
    <Col>
      {/* project card */}
      <Card className="shadow">
        <Card.Link
          href={`single-project/${project._id}`}
          className="text-decoration-none"
        >
          <Card.Header className="bg-black bg-gradient text-white">
            {/* project title */}
            <Card.Title>
              {project.projectTitle}
            </Card.Title>
            {/* project user info */}
            <Card.Subtitle className="text-white-50">
              Posted by {project.createdBy.username} on {project.createdAt}
            </Card.Subtitle>
          </Card.Header>
        </Card.Link>
        <Card.Body>
          {/* project tags */}
          <div>
            <Badge bg="primary">HTML</Badge>{' '}
            <Badge bg="danger">CSS</Badge>{' '}
            <Badge bg="warning" text="dark">JavaScript</Badge>{' '}
            <Badge bg="success">React</Badge>{' '}
            <Badge bg="info" text="dark">MERN</Badge>{' '}
            <Badge bg="secondary">MongoDB</Badge>{' '}
            <Badge bg="dark">MySQL</Badge>{' '}
          </div>
          <hr />
          {/* project description */}
          <Card.Text>
            {project.projectBody}
          </Card.Text>
          <div className="d-flex align-items-center justify-content-between">
            {/* project number of comments */}
            <Card.Link
              href={`single-project/${project._id}`}
              className="text-decoration-none text-muted"
            >
              {project.commentCount} {project.commentCount > 1 || project.commentCount === 0 ? 'comments' : 'comment'}
            </Card.Link>

            {/* will need to fix placement later  */}

            <div>
              {/* link to deployed project */}
              <Button
                href={project.deployedLink}
                variant="primary"
                className="me-2"
              >
                Go to project
              </Button>
              {/* link to project github */}
              <Button
                href={project.repoLink}
                variant="primary"
              >
                <i className="bi bi-github"></i>
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Project;