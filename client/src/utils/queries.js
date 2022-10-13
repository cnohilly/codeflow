import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query Query($input: UserSearchInput!) {
    user(input: $input) {
      _id
      username
      email
      createdAt
      profileImage
      bio
      friends {
        _id
        username
        email
      }
      projects {
        _id
        projectTitle
        projectBody
        projectTags
        createdAt
        createdBy {
          _id
          username
        }
        repoLink
        deployedLink
        commentCount
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
      createdAt
      profileImage
      bio
      friends {
        _id
        username
      }
      projects {
        _id
        projectTitle
        projectBody
        projectTags
        createdAt
        createdBy {
          _id
          username
        }
      }
    }
  }
`;

export const QUERY_PROJECTS = gql`
  query projects {
    projects {
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

export const QUERY_PROJECT = gql`
  query project($id: ID!) {
    project(_id: $id) {
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
      commentCount
      comments {
        _id
        commentCount
      }
    }
  }
`;

export const QUERY_COMMENT = gql`
  query Comment($id: ID!) {
    comment(_id: $id) {
      _id
      commentBody
      createdAt
      createdBy {
        username
        profileImage
        _id
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
      comments {
        _id
        commentCount
      }
      likeCount
    }
  }
`;

export const QUERY_USERS = gql`
  query Query {
    users {
      _id
      username
      profileImage
      bio
      projects {
        projectTitle
      }
    }
  }
`;
