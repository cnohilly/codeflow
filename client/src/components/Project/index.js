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
      <Card className="shadow dark-card-bg border-dark text-light">
        <Card.Link
          href={`../single-project/${project._id}`}
          className="text-decoration-none link-light"
        >
          <Card.Header className="header-bg-color border-success">
            {/* project title */}
            <Card.Title>
              {project.projectTitle}
            </Card.Title>
            {/* project user info */}
            <Card.Subtitle className="text-secondary">
              Posted by {project.createdBy.username} on {project.createdAt}
            </Card.Subtitle>
          </Card.Header>
        </Card.Link>
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
          <div className="d-flex align-items-center justify-content-between">
            {/* project number of comments */}
            <Card.Link
              href={`../single-project/${project._id}`}
              className="text-decoration-none link-secondary text-truncate"
            >
              {project.commentCount} {project.commentCount > 1 || project.commentCount === 0 ? 'comments' : 'comment'}
            </Card.Link>
            <div>
              {/* link to deployed project */}
              {project.deployedLink &&
                <Button
                  href={project.deployedLink}
                  variant="primary"
                  size="sm"
                  className="me-3 fw-semibold rounded-pill"
                >
                  Go to project
                </Button>
              }
              {/* link to project github */}
              {project.repoLink &&
                <Button
                  href={project.repoLink}
                  variant="primary"
                  className="rounded-pill"
                >
                  <i className="bi bi-github"></i>
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
