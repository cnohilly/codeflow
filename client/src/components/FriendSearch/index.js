import React from "react";
import { Col, Card, Button } from "react-bootstrap";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { QUERY_USERS } from "../../utils/queries";
import { ADD_FRIEND } from "../../utils/mutations";

const FriendSearch = (props) => {
  const { loading, data } = useQuery(QUERY_USERS);

  const [addFriend] = useMutation(ADD_FRIEND);
  if (loading) {
    return <div>Loading...</div>;
  }

  const handleClick = async (event) => {
    try {
      await addFriend({
        variables: { id: event.target.value },
      });
    } catch (e) {
      console.error(e);
    }
    event.target.innerHTML = "Friend Added";
  };



  const friendIds = props.friends.map((friend) => { return friend._id; });

  const friends = data.users.filter((user) => {
    return friendIds.indexOf(user._id) < 0;
  })


  return (
    <>
      {friends.map((user) => (
        <Col key={user.username}>
          <Card className="text-white shadow">
            <Card.Body className="d-flex flex-column align-items-center">
              <Card.Link
                href={`../profile/${user.username}`}
                className="text-decoration-none link-light"
              >
                <img
                  src={user.profileImage}
                  alt="profilepic"
                  style={{ width: "75px" }}
                  className="rounded-circle mb-2"
                ></img>
              </Card.Link>
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
