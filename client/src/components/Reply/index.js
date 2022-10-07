import React from 'react';
import { Col, Card, Button } from 'react-bootstrap';

const Reply = () => {

  return (
    <Col>
      {/* reply card */}
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
              {/* reply user info */}
              <Card.Subtitle 
                className="my-2"
              >
                User on 10/06/22
              </Card.Subtitle>
              {/* reply text */}
              <Card.Text>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Hic dolor provident ipsa sunt fuga, amet eligendi, in odio, similique aliquid dolorum dolores assumenda maxime sint eveniet veritatis consequatur vel molestiae.
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

export default Reply;