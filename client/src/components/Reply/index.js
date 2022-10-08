import React from 'react';
import { Col, Card, Button, ButtonGroup } from 'react-bootstrap';

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
            <div className="flex-grow-1">
              <div className="ms-3">
                {/* reply user info */}
                <Card.Subtitle 
                  className="my-2"
                >
                  UserReply on 10/06/22
                </Card.Subtitle>
                {/* reply text */}
                <Card.Text>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Harum ullam 
                  pariatur qui tempora ratione nostrum quae tenetur quo repellendus? Nostrum 
                  deleniti voluptate corrupti quam mollitia placeat, suscipit incidunt vitae quas.
                </Card.Text>
              </div>
              <ButtonGroup aria-label="Button group" className="mt-1 ms-1">
                {/* like button */}
                <Button variant="link" type="button" className="link-info">
                  <i className="bi bi-heart-fill"></i>
                </Button>
                {/* reply button */}
                <Button variant="link" type="button" className="link-warning">
                  <i className="bi bi-pencil-square"></i>
                </Button>
                {/* delete button */}
                <Button variant="link" type="button" className="link-danger">
                  <i className="bi bi-trash-fill"></i>
                </Button>
              </ButtonGroup>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Reply;