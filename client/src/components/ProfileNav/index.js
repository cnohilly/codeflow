import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const ProfileNav = () => {
  return (
    <Container>
      <Card className="bg-dark bg-gradient text-white shadow">
        <Navbar className="flex-column" variant="dark" expand="md">
          <NavLink to="/profile" className="nav-link">
            Account
          </NavLink>
          <NavLink to="/profile/projects" className="nav-link">
            Your Projects
          </NavLink>
          <NavLink to="/profile/comments" className="nav-link">
            Your Comments
          </NavLink>
        </Navbar>
      </Card>
    </Container>
  );
};

export default ProfileNav;
