import React from "react";
import { Col, Card } from "react-bootstrap";

const ProfileError = ({ username, joinDate }) => {
  return (
    <Col className="py-5">
      {/* User Info card */}
      <Card className="bg-dark bg-gradient text-white shadow">
        <Card.Header className="bg-black bg-gradient text-white">
          <Card.Title>Uh oh... There seems to be a problem 😰</Card.Title>
        </Card.Header>
        <Card.Body>
          <p>
            You need to be logged in to view this page. Please use the
            navigation above to signup or login if you already have an account!
          </p>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default ProfileError;
