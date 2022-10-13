import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  // array of footer links for each column
  const companyLinks = [
    {
      text: "About"
    },
    {
      text: "Careers"
    },
    {
      text: "Partners"
    },
    {
      text: "FAQs"
    },
  ];
  const socialMediaLinks = [
    {
      name: "twitter",
      symbol: "bi bi-twitter",
      text: "https://twitter.com/"
    },
    {
      name: "facebook",
      symbol: "bi bi-facebook",
      text: "https://www.facebook.com"
    },
    {
      name: "instagram",
      symbol: "bi bi-instagram",
      text: "https://www.instagram.com/"
    },
    {
      name: "linkedin",
      symbol: "bi bi-linkedin",
      text: "https://www.linkedin.com/"
    },
    {
      name: "stack-overflow",
      symbol: "bi bi-stack-overflow",
      text: "https://stackoverflow.com/"
    },
    {
      name: "github",
      symbol: "bi bi-github",
      text: "https://github.com/"
    }
  ];
  const contactLinks = [
    {
      name: "email",
      symbol: "bi bi-envelope-fill",
      text: "codeflow@gmail.com"
    },
    {
      name: "phone",
      symbol: "bi bi-telephone-fill",
      text: "555-555-5555"
    },
  ];

  return (
    // section for Footer component
    <footer className="mt-auto pt-5 pb-4 bg-black text-center text-md-start text-secondary">
      <Container>
        <Row xs={1} md={4}>
          <Col>
            <h5 className="text-uppercase text-white">About us</h5>
            <p className='brand text-white fs-1 m-0'>
                Code<span className="text-success">Flow</span>
            </p>
            <p>
              Made by Kyle Tang, Stephon Treadwell, Chris Nohilly, Braulio Loaiza, and Ian Zyvith
            </p>
          </Col>
          {/* company */}
          <Col>
            <h5 className="text-uppercase text-white">Company</h5>
            <ul className="list-unstyled d-flex flex-column">
              {companyLinks.map(companyLink => (
                <li 
                  key={companyLink.text.toLowerCase()}
                  className="mb-2"
                >
                  <a 
                    href="/"
                    className="text-secondary text-decoration-none"
                  >
                    {companyLink.text}
                  </a>
                </li>
              ))}
            </ul>
          </Col>
          {/* follow us */}
          <Col>
            <h5 className="text-uppercase text-white">Follow Us</h5>
            <ul className="list-inline">
              {socialMediaLinks.map(socialMediaLink => (
                <li 
                  key={socialMediaLink.name}
                  className="list-inline-item me-3"
                >
                  <a 
                    href={`${socialMediaLink.text}`} 
                    className="btn nav-link fs-2 p-0"
                  >
                    <i className={`${socialMediaLink.symbol}`}></i>
                  </a>
                </li>
              ))}
            </ul>
          </Col>
          {/* contact */}
          <Col>
            <h5 className="text-uppercase text-white">Contact</h5>
            <ul className="list-unstyled d-flex flex-column">
              {contactLinks.map(contactLink => (
                <li 
                  key={contactLink.name}
                  className="mb-2 mx-auto mx-md-0"
                >
                  <a 
                    href="/" 
                    className="text-secondary text-decoration-none"
                  >
                    <i className={`${contactLink.symbol} pe-2`}
                    ></i>
                    {contactLink.text}
                  </a>
                </li>
              ))}
            </ul>
          </Col>
        </Row>
        <hr />
        <div>
          <ul className="list-unstyled d-flex flex-column flex-md-row">
            <li className="mb-2 order-last order-md-first">
              &copy; 2022 CodeFlow, Inc. All Rights Reserved.
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