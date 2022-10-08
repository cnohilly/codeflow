import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProfileNav from "../components/ProfileNav";
import Comment from "../components/Comment";

import { useQuery, useMutation } from "@apollo/client";
// import { QUERY_USERS, QUERY_ME } from "../utils/queries";
import Auth from "../utils/auth";

const ProfileComments = (props) => {
  // insert auth stuff here to verify that user is logged in

  return (
    <Container id="profile-comments" className="py-3">
      <Row>
        <Col xs={9}>
          <Row>
            <Comment />
          </Row>
        </Col>

        <Col xs={3}>
          <Row>
            <ProfileNav />
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfileComments;
