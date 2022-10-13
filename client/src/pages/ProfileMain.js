import React, { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { Container, Row, Col, Tab, Tabs, Nav } from "react-bootstrap";
import UserInfo from "../components/UserInfo";
import FriendList from "../components/FriendList";
import ProfileError from "../components/ProfileError";
import ProjectForm from "../components/ProjectForm";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_USER, QUERY_ME } from "../utils/queries";
import CommentList from "../components/CommentList";
import ProjectList from "../components/ProjectList";
import Auth from "../utils/auth";

const ProfileMain = (props) => {
  const { username: userParam } = useParams();
  console.log(userParam);

  // to be used later for adding friends
  //   const [addFriend] = useMutation(ADD_FRIEND);
  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: {
      input: {
        username: userParam,
      },
    },
  });

  console.log(data);
  const user = data?.me || data?.user || {};

  // navigate to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/profile/about" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log(user);

  if (!user?.username) {
    return (
      <Row className="justify-content-md-center">
        <Col xs={6}>
          <ProfileError />
        </Col>
      </Row>
    );
  }

  return (
    <Container className="py-4">
      <Tab.Container
        id="profile-tabs"
        defaultActiveKey="about"
        className="mb-3"
      >
        <Row>
          <Col xs={9}>
            <Tab.Content>
              <Tab.Pane eventKey="about">
                <UserInfo
                  userId={user._id}
                  username={user.username}
                  joinDate={user.createdAt}
                  profilePic={user.profileImage}
                />
              </Tab.Pane>
              <Tab.Pane eventKey="projects">
                <ProjectForm />
                <ProjectList projects={user.projects} />
              </Tab.Pane>
            </Tab.Content>
          </Col>
          <Col xs={3}>
            <Row className="gx-0">
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="about">About</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="projects">Projects</Nav.Link>
                </Nav.Item>
              </Nav>
            </Row>
            <Row>
              <FriendList username={user.username} friends={user.friends} />
            </Row>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
};

export default ProfileMain;
