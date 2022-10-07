import React from 'react';
import { Col, Card, Button } from 'react-bootstrap';

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
            <div className="flex-grow-1 ms-3">
              {/* comment user info */}
              <Card.Subtitle 
                className="my-2"
              >
                User on 10/06/22
              </Card.Subtitle>
              {/* comment text */}
              <Card.Text>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos a alias aliquam veritatis cupiditate dolore qui sit inventore possimus, natus odio molestiae illum quis officiis sed laborum labore saepe impedit.
              </Card.Text>
            </div>
          </div>
          <div className="d-flex justify-content-end mt-3">
            {/* reply button */}
            <Button variant="primary" size="sm" className="rounded-pill px-4">
              Reply
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Comment;