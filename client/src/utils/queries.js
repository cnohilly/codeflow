import { gql } from "@apollo/client";

export const QUERY_USER = gql`

query Query($input: UserSearchInput!) {
  user(input: $input) {
    _id
    username
    email
    profileImage
    friends {
      _id
      username
      email
    }
    posts {
      _id
      postBody
      createdAt
      createdBy {
        _id
        username
      }
      repoLink
      deployedLink
      replyCount
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
    }
  }
`;
