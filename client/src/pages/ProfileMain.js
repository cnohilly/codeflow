import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Project from "../components/Project";
import ProjectForm from "../components/ProjectForm";
import Comment from "../components/Comment";
import UserInfo from "../components/UserInfo";
import FriendList from "../components/FriendList";
import ProfileNav from "../components/ProfileNav";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_USER, QUERY_ME } from "../utils/queries";
import Auth from "../utils/auth";

const ProfileMain = (props) => {
  const { username: userParam } = useParams();

  // to be used later for adding friends
  //   const [addFriend] = useMutation(ADD_FRIEND);
  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: {
      input: {
        username: userParam
      }
    }
  });

  const user = data?.me || data?.user || {};


  // navigate to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/profile:username" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log(user);

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  return (
    <Container id="profile-info" className="py-3">
      <Row>
        <Col xs={9}>
          <Row>
            <UserInfo />
          </Row>
        </Col>

        <Col xs={3}>
          <Row>
            <ProfileNav />
            <FriendList />
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfileMain;
