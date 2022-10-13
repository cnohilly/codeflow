import React from "react";
import { Link } from "react-router-dom";
import { Col, Card, Button } from "react-bootstrap";


const FriendList = ({ friendCount, username, friends }) => {

  if (!friends || !friends.length) {
    return (
      <Col className="py-3">
        <Card className="text-white shadow">
          <p className="mx-auto mt-3">{username}, make some friends!</p>
        </Card>
      </Col>
    );
  }

  return (
    <Col className="pt-3">
      <Card className="text-white shadow">
        <div className="text-center p-2">
          <h5>
            {username}'s {friendCount}{" "}
            {friendCount === 1 ? "friend" : "friends"}
          </h5>
          <div className="btn-group-vertical w-100 display-block">
            {friends.map((friend) => (
              <Link 
                to={`/profile/${friend.username}`}
                class="btn btn-outline-success"
              >
                {friend.username}
              </Link>
            ))}
          </div>
        </div>
      </Card>
    </Col>
  );
};

export default FriendList;
