import React from "react";
import { Col, Card, Row, Form, Button } from "react-bootstrap";

const UserInfo = ({ username, joinDate, profilePic }) => {
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
              <Col xs={20}>
                <div>
                  {/* profile image */}
                  <img
                    src={profilePic}
                    alt="profile-pic"
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

                    <Form>
                      <Form.Group className="mb-3" controlId="newProfilePic">
                        <Form.Label>New Profile Pic</Form.Label>
                        <Form.Control
                          as="textarea"
                          placeholder="Use Image Link"
                          rows={1}
                          className="bg-dark text-white"
                        />
                      </Form.Group>
                      <Button
                        variant="primary"
                        type="submit"
                        size="sm"
                        className="rounded-pill px-3 me-2 fw-semibold"
                      >
                        Submit
                      </Button>
                    </Form>
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
