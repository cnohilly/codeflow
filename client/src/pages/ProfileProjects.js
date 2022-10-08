import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProfileNav from "../components/ProfileNav";
import ProjectForm from "../components/ProjectForm";
import Project from "../components/Project";

import { useQuery, useMutation } from "@apollo/client";
// import { QUERY_USERS, QUERY_ME } from "../utils/queries";
import Auth from "../utils/auth";

const ProfileProjects = (props) => {
  // insert auth stuff here to verify that user is logged in

  return (
    <Container id="profile-projects" className="py-3">
      <Row>
        <Col xs={9}>
          <Row>
            <ProjectForm />
          </Row>
          <Row>
            <Project />
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

export default ProfileProjects;
