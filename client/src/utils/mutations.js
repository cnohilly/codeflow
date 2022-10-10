import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        createdAt
      }
    }
  }
`;

export const ADD_COMMENT = gql`
mutation Mutation($projectId: ID!, $commentBody: String!) {
  addComment(projectId: $projectId, commentBody: $commentBody) {
    _id
    commentBody
    createdAt
    createdBy {
      _id
      username
      profileImage
    }
    projectId {
      _id
    }
    parentCommentId {
      _id
    }
    isDeleted
    lastEditedAt
    commentCount
    likeCount
  }
}
`;
