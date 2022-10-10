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

export const DELETE_COMMENT = gql`
  mutation DeleteComment($id: ID!) {
    deleteComment(_id: $id) {
      _id
      isDeleted
    }
  }
`;

export const UPDATE_LIKE_COMMENT = gql`
  mutation updateCommentLike($id: ID!) {
    updateCommentLike(_id: $id) {
      _id
      likeCount
    }
  }
`;

export const ADD_PROJECT = gql`
  mutation addProject($projectTitle: String!, $projectBody: String!) {
    addProject(projectTitle: $projectTitle, projectBody: $projectBody) {
      _id
      projectTitle
      projectBody
      createdBy {
        _id
        username
        profileImage
      }
      createdAt
      repoLink
      deployedLink
      lastEditedAt
      commentCount
    }
  }
`;
