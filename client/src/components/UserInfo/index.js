import React from "react";
import { Col, Card, Row } from "react-bootstrap";

const UserInfo = ({ username, joinDate }) => {
  return (
    <Col>
      {/* User Info card */}
      <Card className="bg-dark bg-gradient text-white shadow">
        <Card.Header className="bg-black bg-gradient text-white">
          <Card.Title>{username}</Card.Title>
          <Card.Subtitle className="text-white-50">
            Member Since {joinDate}
          </Card.Subtitle>
        </Card.Header>
        <Card.Body>
          <div className="d-flex">
            <Row>
              <Col>
                <div>
                  {/* profile image */}
                  <img
                    src="https://toppng.com/uploads/thumbnail/roger-berry-avatar-placeholder-115629915618zfpmweri9.png"
                    alt="..."
                    style={{ width: "150px" }}
                  />
                </div>
              </Col>
            </Row>

            <Row>
              <div className="flex-grow-1">
                <div className="ms-3">
                  {/* comment text */}
                  <Card.Body>
                    <h3>About Me:</h3>
                    <p>
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Eos a alias aliquam veritatis cupiditate dolore qui sit
                      inventore possimus, natus odio molestiae illum quis
                      officiis sed laborum labore saepe impedit.
                    </p>
                  </Card.Body>
                </div>
              </div>
            </Row>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default UserInfo;
