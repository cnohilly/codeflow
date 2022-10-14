import React, { useState } from "react";
import { Col, Card, Row, Form, Button } from "react-bootstrap";
import BioButton from "../BioButton";
import BioForm from "../BioForm";
import { EDIT_USER } from "../../utils/mutations";
import { useMutation } from "@apollo/client";
import Auth from "../../utils/auth";

const UserInfo = ({ userId, username, joinDate, profilePic, userBio }) => {
  // needed for updating bio form
  const [displayBioForm, setDisplayBioForm] = useState(false);

  const toggleBioForm = () => {
    setDisplayBioForm(!displayBioForm);
  };

  // update profile pic function
  const [pic, setPic] = useState("");
  const [editUser] = useMutation(EDIT_USER);

  const handleChangePic = (event) => {
    setPic(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await editUser({
        variables: {
          id: Auth.getProfile().data._id,
          input: {
            profileImage: pic,
          },
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
            <Col xs={2}>
              <div>
                {/* profile image */}
                <img
                  src={profilePic}
                  alt="profile-pic"
                  style={{ width: "125px" }}
                  className="rounded-circle ar1x1"
                />
              </div>
            </Col>

            <Col xs={10}>
              <div className="flex-grow-1">
                <div className="ms-3">
                  {/* comment text */}
                  <Card.Body>
                    <Row>
                      <Col xs={12} className="me-0">
                        <h3>About Me</h3>
                      </Col>
                      {(Auth.loggedIn() && userId === Auth.getProfile().data._id) &&
                        <Col className="px-0">
                          <BioButton toggleBioForm={toggleBioForm} />
                        </Col>
                      }
                    </Row>
                    {!displayBioForm ? (
                      <>
                        <Row xs={12}>
                          <p className="text-secondary">{userBio}</p>
                        </Row>
                      </>
                    ) : (
                      // edit bio
                      <BioForm
                        id={userId}
                        bio={userBio}
                        toggleBioForm={toggleBioForm}
                      />
                    )}

                    {(Auth.loggedIn() && userId === Auth.getProfile().data._id) &&
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
                    }
                  </Card.Body>
                </div>
              </div>
            </Col>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default UserInfo;
