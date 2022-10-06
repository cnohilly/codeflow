import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  // array of footer links for each column
  // const columnLinks1 = [];
  // const columnLinks2 = [];
  // const columnLinks3 = [];

  return (
    // section for Footer component
    <footer className="pt-5 pb-4 bg-black text-center text-md-start text-white">
      <Container>
        <Row xs={1} md={4}>
          <Col>
            <h5 className="text-uppercase">About us</h5>
            <p>
            Made by Kyle Tang, Stephon Treadwell, Chris Nohilly, Braulio Loaiza, and Ian Zyvith
            </p>
          </Col>
          <Col>
            <h5 className="text-uppercase">Company</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="/" className="text-white">Link 1</a>
              </li>
              <li className="mb-2">
                <a href="/" className="text-white">Link 2</a>
              </li>
              <li className="mb-2">
                <a href="/" className="text-white">Link 3</a>
              </li>
              <li className="mb-2">
                <a href="/" className="text-white">Link 4</a>
              </li>
            </ul>
          </Col>
          <Col>
            <h5 className="text-uppercase">Follow Us</h5>
            <ul className="list-unstyled">
              <li  className="mb-2">
                <a href="/" className="text-white">Link 1</a>
              </li>
              <li  className="mb-2">
                <a href="/" className="text-white">Link 2</a>
              </li>
              <li  className="mb-2">
                <a href="/" className="text-white">Link 3</a>
              </li>
              <li  className="mb-2">
                <a href="/" className="text-white">Link 4</a>
              </li>
            </ul>
          </Col>
          <Col>
            <h5 className="text-uppercase">Contact</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="/" className="text-white">Link 1</a>
              </li>
              <li className="mb-2">
                <a href="/" className="text-white">Link 2</a>
              </li>
              <li className="mb-2">
                <a href="/" className="text-white">Link 3</a>
              </li>
              <li className="mb-2">
                <a href="/" className="text-white">Link 4</a>
              </li>
            </ul>
          </Col>
        </Row>
        <hr />
        <div>
          <ul className="list-unstyled d-flex flex-column flex-md-row">
            <li className="mb-2 order-last order-md-first">
              &copy; 2022 Project 3, Inc.
            </li>
            <li className="mb-2 mx-md-4">
              <a href="/" className="nav-link">Terms and Conditions</a>
            </li>
            <li className="mb-2 order-first order-md-last">
              <a href="/" className="nav-link">Privacy Policy</a>
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;