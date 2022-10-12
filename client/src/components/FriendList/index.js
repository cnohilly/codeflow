import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card, Button, ButtonGroup } from "react-bootstrap";

const FriendList = ({ friendCount, username, friends }) => {
  if (!friends || !friends.length) {
    return (
      <Col className="py-3">
        <Card className="bg-dark bg-gradient text-white shadow">
          <p className="mx-auto mt-3">{username}, make some friends!</p>
        </Card>
      </Col>
    );
  }

  return (
    <Col className="py-5">
      <Card className="bg-dark bg-gradient text-white shadow">
        <div className="text-center my-3">
          <h5>
            {username}'s {friendCount}{" "}
            {friendCount === 1 ? "friend" : "friends"}
          </h5>
          {friends.map((friend) => (
            <button className="btn w-100 display-block mb-2" key={friend._id}>
              <Link to={`/profile/${friend.username}`}>{friend.username}</Link>
            </button>
          ))}
        </div>
      </Card>
    </Col>
  );
};

export default FriendList;
