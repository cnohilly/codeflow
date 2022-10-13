import React from "react";
import { useState } from 'react';
import { Col, Card, Button } from "react-bootstrap";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { QUERY_USERS } from "../../utils/queries";
import { ADD_FRIEND } from "../../utils/mutations";

const FriendSearch = () => {
  const { loading, data } = useQuery(QUERY_USERS);
  const [addFriend] = useMutation(ADD_FRIEND);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleClick = async (event) => {

    console.log(event.target.value)
    try {
      await addFriend({
        variables: { id: event.target.value }
      });
    } catch (e) {
      console.error(e);
    }
    event.target.innerHTML = 'Friend Added';
  };

  return (
    <>
      {data.users.map((user) => (
        <Col key={user.username}>
          <Card className="text-white shadow">
            <Card.Body className="d-flex flex-column align-items-center">
              <img
                src={user.profileImage}
                alt="profilepic"
                style={{ width: "75px" }}
                className="rounded-circle mb-2"
              ></img>
              <p className="mb-4 fs-5">{user.username}</p>
              <Button
                variant="primary"
                type="button"
                className="rounded-pill fw-semibold text-white"
                value={user._id}
                onClick={handleClick}
              >
                <i className="bi bi-suit-heart-fill pe-1"></i>Add Friend
              </Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </>
  );
};

export default FriendSearch;
