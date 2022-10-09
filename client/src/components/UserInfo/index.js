import React from "react";
import { Col, Card, Row, Button, ButtonGroup } from "react-bootstrap";

const UserInfo = () => {
  return (
    <Col>
      {/* User Info card */}
      <Card className="bg-dark bg-gradient text-white shadow">
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

                <h1>Username</h1>
              </Col>
            </Row>

            <Row>
              <div className="flex-grow-1">
                <div className="ms-3">
                  {/* comment user info */}
                  <Card.Subtitle className="my-2">
                    Member Since (insert date here)
                  </Card.Subtitle>
                  <br />
                  {/* comment text */}
                  <Card.Body>
                    <h3>User Bio:</h3>
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
