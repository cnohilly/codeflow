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
          <NavLink to="/" className="ms-auto nav-link">
            <Navbar.Brand>
              <img
                src="/logo192.png"
                width="30"
                height="30"
                className="d-inline-block align-top"
                alt="React Bootstrap logo"
              />{" "}
              Codename-Poseidon
            </Navbar.Brand>
          </NavLink>
          {/* menu button */}

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            {Auth.loggedIn() ? (
              <Nav className="ms-auto">
                {/* testing page */}
                <NavLink to="/single-project" className="ms-auto nav-link">
                  Single Project Page for testing
                </NavLink>

                <NavLink to="/profile" className="ms-auto nav-link">
                  Profile
                </NavLink>
                <a href="/" onClick={logout} className="ms-auto nav-link">
                  Logout
                </a>
              </Nav>
            ) : (
              <Nav className="ms-auto">
                {/* testing page */}
                <NavLink to="/single-project" className="ms-auto nav-link">
                  Single Project Page for testing
                </NavLink>

                <NavLink to="/login" className="ms-auto nav-link">
                  Login
                </NavLink>
                <NavLink to="/signup" className="ms-auto nav-link">
                  Signup
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
