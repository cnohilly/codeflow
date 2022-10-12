import React from "react";
import {useState} from 'react';
import { Link } from "react-router-dom";
import { Row, Col, Card, Button, ButtonGroup } from "react-bootstrap";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { QUERY_USERS} from "../../utils/queries";
import { ADD_FRIEND } from "../../utils/mutations";

const FriendSearch = () => {
  const { loading, data } = useQuery(QUERY_USERS);
  const [addFriend] = useMutation(ADD_FRIEND);

  const [buttonText, setButtonText] = useState('Add Friend');

 

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleClick = async () => {
    console.log('working')
    
    // try {
    //   await addFriend({
    //     variables: { id:  }
    //   });
    // } catch (e) {
    //   console.error(e);
    // }
  };

  return (
    <>
      {data.users.map((user) => (
        <Col className="py-3" key={user.username}>
          
          <Card className="bg-black bg-gradient text-white shadow">
            <div className="d-flex flex-column align-items-center px-3">
              <img
                src={user.profileImage}
                alt="profilepic"
                style={{ borderRadius: "50%", width: "50%" }}
                className="my-3"
              ></img>
              <h5>{user.username}</h5>
              <button
                className="btn w-100 display-block mb-2 btn-primary "
                onClick={handleClick}
              >
                <i className="bi bi-suit-heart-fill text-white"></i> {buttonText}
              </button>
            </div>
          </Card>

        </Col>
      ))}
    </>
  );
};

export default FriendSearch;
