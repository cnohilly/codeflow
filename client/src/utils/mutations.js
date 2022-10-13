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

export const EDIT_USER = gql`
  mutation editUser($input: EditUserInput!, $id: ID!) {
    editUser(input: $input, _id: $id) {
      token
      user {
        _id
        profileImage
        bio
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation Mutation(
    $projectId: ID!
    $parentCommentId: ID
    $commentBody: String!
  ) {
    addComment(
      projectId: $projectId
      parentCommentId: $parentCommentId
      commentBody: $commentBody
    ) {
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

export const EDIT_COMMENT = gql`
  mutation Mutation($id: ID!, $commentBody: String!) {
    editComment(_id: $id, commentBody: $commentBody) {
      _id
      commentBody
      lastEditedAt
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
  mutation addProject(
    $projectTitle: String!
    $projectTags: [String]!
    $projectBody: String!
    $repoLink: String
    $deployedLink: String
  ) {
    addProject(
      projectTitle: $projectTitle
      projectTags: $projectTags
      projectBody: $projectBody
      repoLink: $repoLink
      deployedLink: $deployedLink
    ) {
      _id
      projectTitle
      projectBody
      projectTags
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

export const ADD_FRIEND = gql`
  mutation addFriend($id: ID!) {
    addFriend(_id: $id) {
      _id
      username
      friendCount
      friends {
        _id
        username
      }
    }
  }
`;
