import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { Container, Row, Col, Tab, Nav, Button } from "react-bootstrap";
import UserInfo from "../components/UserInfo";
import FriendList from "../components/FriendList";
import FriendSearch from "../components/FriendSearch";
import ProfileError from "../components/ProfileError";
import ProjectForm from "../components/ProjectForm";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_USER, QUERY_ME } from "../utils/queries";
import ProjectList from "../components/ProjectList";
import Auth from "../utils/auth";

import { ADD_FRIEND } from "../utils/mutations";

const ProfileMain = (props) => {
  const [addFriend] = useMutation(ADD_FRIEND);

  const { username: userParam } = useParams();

  // to be used later for adding friends
  //   const [addFriend] = useMutation(ADD_FRIEND);
  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: {
      input: {
        username: userParam,
      },
    },
  });

  const user = data?.me || data?.user || {};

  // navigate to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/profile" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <Row className="justify-content-md-center">
        <Col xs={6}>
          <ProfileError />
        </Col>
      </Row>
    );
  }

  const handleClick = async () => {
    try {
      await addFriend({
        variables: { id: user._id },
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Container className="py-4">
      <Tab.Container
        id="profile-tabs"
        defaultActiveKey="about"
        className="mb-3"
      >
        <Row>
          <Col xs={7} md={9}>
            <Tab.Content>
              <Tab.Pane eventKey="about">
                <UserInfo
                  userId={user._id}
                  username={user.username}
                  joinDate={user.createdAt}
                  profilePic={user.profileImage}
                  userBio={user.bio}
                />
              </Tab.Pane>
              <Tab.Pane eventKey="projects">
                <ProjectForm />
                <ProjectList projects={user.projects} />
              </Tab.Pane>
              <Tab.Pane eventKey="find-friends">
                <Row xs={1} md={2} lg={3} className="g-3">
                  <FriendSearch friends={user.friends} />
                </Row>
              </Tab.Pane>
            </Tab.Content>
          </Col>
          <Col xs={5} md={3}>
            <Row className="gx-0">
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="about">About</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="projects">Projects</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="find-friends">Find Friends</Nav.Link>
                </Nav.Item>
              </Nav>
              {(Auth.loggedIn() && !user._id === Auth.getProfile().data._id) &&
                <Button
                  variant="success"
                  className="mt-3 fw-bold"
                  onClick={handleClick}
                >
                  Add Friend
                </Button>
              }

              <FriendList username={user.username} friends={user.friends} />
            </Row>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
};

export default ProfileMain;
