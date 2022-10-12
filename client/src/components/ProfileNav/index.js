import React from "react";
import { Container, Row, Col, Card, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const ProfileNav = () => {
  return (
    <Container>
      <Card className="bg-dark bg-gradient text-white shadow">
        <Navbar className="flex-column" variant="dark" expand="md">
          <NavLink to="#about" className="nav-link">
            Account
          </NavLink>
          <Nav.Item>
            <NavLink eventKey="projects" className="nav-link">
              Your Projects
            </NavLink>
          </Nav.Item>
          <NavLink to="/profile/comments" className="nav-link">
            Your Comments
          </NavLink>
        </Navbar>
      </Card>
    </Container>
  );
};

export default ProfileNav;
