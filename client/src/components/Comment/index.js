import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const Comment = () => {

  return (
    <Col>
      {/* comment card */}
      <Card className="shadow">
        <Card.Body>
        <div class="d-flex">
          <div class="flex-shrink-0">
            {/* profile image */}
            <img 
              src="https://toppng.com/uploads/thumbnail/roger-berry-avatar-placeholder-115629915618zfpmweri9.png" 
              alt="..."
              style={{ width: "36px" }}
            />
          </div>
          <div class="flex-grow-1 ms-3">
            {/* comment user info */}
            <Card.Subtitle 
              className="my-2"
            >
              Posted by randomuser on 10/06/22
            </Card.Subtitle>
            {/* comment text */}
            <Card.Text>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos a alias aliquam veritatis cupiditate dolore qui sit inventore possimus, natus odio molestiae illum quis officiis sed laborum labore saepe impedit.
            </Card.Text>
          </div>
        </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Comment;