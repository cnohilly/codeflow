import { gql } from "@apollo/client";

export const QUERY_USERS = gql`

    query users(){
        users(){
            _id
            username
            email
            friends {
                _id
                username
            }
        }
    }
`;

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      friends {
        _id
        username
      }
    }
  }
`;

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      friends {
        _id
        username
      }
    }
  }
`;
