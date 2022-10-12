import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card, Button, ButtonGroup } from "react-bootstrap";
import { useQuery } from "@apollo/client";
import { QUERY_USERS } from "../../utils/queries";

const FriendSearch = () => {
  const { loading, data } = useQuery(QUERY_USERS);

  console.log(data);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
     { data.users.map((user) => (
      <Col className="py-3" key={user.username}>
        <Card className="bg-black bg-gradient text-white shadow">
          <div className="d-flex flex-column align-items-center px-3">
            <img src={user.profileImage} alt="profilepic" style={{  borderRadius: "50%", width:"50%" }} className="my-3"></img>
              <h5>{user.username}</h5>
              <button
                className="btn w-100 display-block mb-2 btn-primary "
              >
                <Link to={`${user.username}`} className="text-decoration-none text-white"><i className="bi bi-suit-heart-fill text-white"></i> Add Friend </Link>
              </button>
          </div>
        </Card>
      </Col>
      ))}
    </>
  );
};

export default FriendSearch;
