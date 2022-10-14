import React from "react";
import { Col, Card, Badge, Button } from "react-bootstrap";

const Project = (props) => {

  const {
    project
  } = props;

  const randomVariant = () => {
    const variants = [
      { bg: 'primary', text: 'dark' },
      { bg: 'secondary', text: 'dark' },
      { bg: 'success', text: 'dark' },
      { bg: 'danger', text: 'light' },
      { bg: 'warning', text: 'dark' },
      { bg: 'info', text: 'dark' },
      { bg: 'dark', text: 'light' },
      { bg: 'light', text: 'dark' }
    ]
    return (variants[Math.floor(Math.random() * variants.length)]);
  }

  return (
    <Col>
      {/* project card */}
      <Card className="shadow border-dark text-light">
        <Card.Header className="border-success">
          {/* project title */}
          <Card.Link
            href={`../single-project/${project._id}`}
            className="text-decoration-none link-light"
          >
            <Card.Title>
              {project.projectTitle}
            </Card.Title>
            {/* project user info */}
          </Card.Link>
          <Card.Subtitle className="text-secondary">
            Posted by{' '}
            <Card.Link
              href={`../profile/${project.createdBy.username}`}
              className="text-decoration-none link-light"
            >
              {project.createdBy.username}
            </Card.Link>
            {' '}on {project.createdAt}
          </Card.Subtitle>
        </Card.Header>
        <Card.Body>
          {/* project tags */}
          <div>
            {project.projectTags.map((tag, index) => {
              const variant = randomVariant();
              return (<Badge key={tag + index} className="me-2" pill bg={variant.bg} text={variant.text}>{tag}</Badge>)
            })}
          </div>
          <hr />
          {/* project description */}
          <Card.Text>{project.projectBody}</Card.Text>
          <div className="d-flex flex-column flex-md-row justify-content-between">
            {/* project number of comments */}
            <Card.Link
              href={`../single-project/${project._id}`}
              className="text-decoration-none link-secondary text-truncate fw-semibold order-2 order-md-1"
            >
              <i className="bi bi-chat-square-fill pe-2"></i>
              {project.commentCount} {project.commentCount > 1 || project.commentCount === 0 ? 'comments' : 'comment'}
            </Card.Link>
            <div className="order-1 order-md-2 mb-3 mb-md-0">
              {/* link to deployed project */}
              {project.deployedLink &&
                <Button
                  href={project.deployedLink}
                  variant="success"
                  size="sm"
                  className="me-2 fw-bold rounded-pill"
                >
                  Visit Project
                </Button>
              }
              {/* link to project github */}
              {project.repoLink &&
                <Button
                  href={project.repoLink}
                  variant="success"
                  size="sm"
                  className="rounded-pill fw-bold"
                >
                  <i className="bi bi-github me-2"></i>
                  GitHub
                </Button>
              }
            </div>
          </div>
        </Card.Body>
      </Card>
    </Col >
  );
};

export default Project;
