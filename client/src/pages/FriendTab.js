import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import ProjectForm from "../components/ProjectForm";
import ProjectList from "../components/ProjectList";
import ProfileNav from "../components/ProfileNav";
//import ProfileError from "../components/ProfileError";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_USER, QUERY_ME, QUERY_USERS } from "../utils/queries";
import Auth from "../utils/auth";
import FriendSearch from "../components/FriendSearch";

const FriendTab = (props) => {
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
    return <Navigate to="/profile/user-projects:username" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log(user);

  if (!user?.username) {
    return (
      <Row className="justify-content-md-center">
        <Col xs={6}>
          {/* <ProfileError /> */}
        </Col>
      </Row>
    );
  }

  return (
    <Container id="profile-info" className="py-3">
      <Row>
        <Col >
          <Row xs={3} className="g-4">
          <FriendSearch />
          </Row>
        </Col>

        <Col xs={3}>
          <Row>
            <ProfileNav />
            
            {/* <button className="btn ml-auto" onClick={handleClick}>
              Add Friend
            </button> */}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default FriendTab;
