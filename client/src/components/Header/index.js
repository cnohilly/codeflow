import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import Auth from "../../utils/auth";

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    // section for Header component
    <header className="sticky-top">
      <Navbar bg="black" variant="dark" expand="md">
        <Container fluid className="px-3">
          {/* brand image and name */}
          <NavLink to="/" className="nav-link">
            <Navbar.Brand className="d-flex">
              <img
                src="/logo192.png"
                width="30"
                height="30"
                className="d-inline-block align-top me-2"
                alt="CodeFlow logo"
              />
              <div className="d-none d-sm-block brand fs-4">
                {/* Codename-Poseidon */}
                Code<span className="text-success">Flow</span>
              </div>
            </Navbar.Brand>
          </NavLink>

          {/* menu button */}
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />

          {/* responsive menu */}
          <Navbar.Collapse id="responsive-navbar-nav">
            {Auth.loggedIn() ? (
              <Nav className="ms-auto">
                <NavLink to="/profile" className="ms-auto nav-link">
                  Profile
                </NavLink>
                <a href="/" onClick={logout} className="ms-auto nav-link">
                  Logout
                </a>
              </Nav>
            ) : (
              <Nav className="ms-auto">
                <NavLink to="/login" className="ms-auto nav-link">
                  Login
                </NavLink>
                <NavLink to="/signup" className="ms-auto nav-link">
                  Sign Up
                </NavLink>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
