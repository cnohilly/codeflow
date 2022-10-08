import React from 'react';
import { Col, Card, Button, ButtonGroup, ButtonToolbar } from 'react-bootstrap';

const Comment = () => {

  return (
    <Col>
      {/* comment card */}
      <Card className="bg-dark bg-gradient text-white shadow">
        <Card.Body>
          <div className="d-flex">
            <div className="flex-shrink-0">
              {/* profile image */}
              <img 
                src="https://toppng.com/uploads/thumbnail/roger-berry-avatar-placeholder-115629915618zfpmweri9.png" 
                alt="..."
                style={{ width: "36px" }}
              />
            </div>
            
            <div className="flex-grow-1">
              <div className="ms-3">
                {/* comment user info */}
                <Card.Subtitle 
                  className="my-2"
                >
                  UserComment on 10/06/22
                </Card.Subtitle>
                {/* comment text */}
                <Card.Text>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos a alias aliquam veritatis cupiditate dolore qui sit inventore possimus, natus odio molestiae illum quis officiis sed laborum labore saepe impedit.
                </Card.Text>
              </div>

              <ButtonToolbar aria-label="Toolbar with button groups" className="mt-1 ms-1">
                {/* like button */}
                <div className="d-flex align-items-center me-2">
                  <Button variant="link" type="button" className="link-info pe-2">
                    <i className="bi bi-heart-fill"></i>
                  </Button>
                  {/* number of likes */}
                  <div>
                    # of Likes
                  </div>
                </div>
                <ButtonGroup aria-label="Button group">
                  {/* reply button */}
                  <Button variant="link" type="button" className="link-warning">
                    <i className="bi bi-pencil-square"></i>
                  </Button>
                  {/* delete button */}
                  <Button variant="link" type="button" className="link-danger">
                    <i className="bi bi-trash-fill"></i>
                  </Button>
                </ButtonGroup>
              </ButtonToolbar>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Comment;