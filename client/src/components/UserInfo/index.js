import React, { useState } from "react";
import { Col, Card, Row, Form, Button } from "react-bootstrap";
import { EDIT_USER } from "../../utils/mutations";
import { useMutation } from "@apollo/client";
import Auth from "../../utils/auth";

const UserInfo = ({ username, joinDate, profilePic }) => {
  // update profile pic function
  const [pic, setPic] = useState("");
  const [editUser] = useMutation(EDIT_USER);

  const handleChangePic = (event) => {
    setPic(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      console.log(pic);
      console.log(Auth.getProfile().data._id)
      await editUser({
        variables: {
          id: Auth.getProfile().data._id,
          input: {
            profileImage: pic
          }
        },
      });

      // clear form value
      setPic("");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Col>
      {/* User Info card */}
      <Card className="text-white shadow">
        <Card.Header className="text-white">
          <Card.Title>{username}</Card.Title>
          <Card.Subtitle className="text-white-50">
            Member Since {joinDate}
          </Card.Subtitle>
        </Card.Header>
        <Card.Body>
          <div className="d-flex flex-column flex-md-row">
            <Row>
              <Col xs={20}>
                <div>
                  {/* profile image */}
                  <img
                    src={profilePic}
                    alt="profile-pic"
                    style={{ width: "125px" }}
                    className="rounded-circle"
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
                    <p className="text-secondary">
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Eos a alias aliquam veritatis cupiditate dolore qui sit
                      inventore possimus, natus odio molestiae illum quis
                      officiis sed laborum labore saepe impedit.
                    </p>

                    <Form onSubmit={handleFormSubmit}>
                      <Form.Group className="mb-3" controlId="newProfilePic">
                        <Form.Label>New Profile Pic</Form.Label>
                        <Form.Control
                          as="textarea"
                          placeholder="Use Image Link"
                          value={pic}
                          rows={1}
                          className="bg-dark text-white"
                          onChange={handleChangePic}
                        />
                      </Form.Group>
                      <Button
                        variant="success"
                        type="submit"
                        className="rounded-pill px-3 fw-bold"
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
