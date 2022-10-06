import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

const Header = () => {
  return (
    // section for Header component
    <header>
        <Navbar bg="black" variant="dark" sticky="top" expand="md" >
          <Container fluid className="px-3">
            {/* brand image and name */}
            <Navbar.Brand 
              // as={Link} to='/'
              href="#home"
            >
              <img
                src="/logo192.png"
                width="30"
                height="30"
                className="d-inline-block align-top"
                alt="React Bootstrap logo"
              />{' '}
              Navbar
            </Navbar.Brand>
            {/* menu button */}
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="ms-auto">
                <Nav.Link 
                  // as={Link} to='/'
                  href="#home" 
                  className="ms-auto"
                >
                  Home
                </Nav.Link>
                <Nav.Link 
                  // as={Link} to='/profile'
                  href="#Profile" 
                  className="ms-auto"
                >
                  Profile
                </Nav.Link>
                <Nav.Link  
                  className="ms-auto"
                >
                  Logout
                </Nav.Link>
                <Nav.Link 
                  // as={Link} to='/login'
                  href="#login" 
                  className="ms-auto"
                >
                  Login
                </Nav.Link>
                <Nav.Link 
                  // as={Link} to='/signup'
                  href="#signup" 
                  className="ms-auto"
                >
                  Signup
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
    </header>
  );
};

export default Header;