import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query Query($input: UserSearchInput!) {
    user(input: $input) {
      _id
      username
      email
      createdAt
      profileImage
      friends {
        _id
        username
        email
      }
      projects {
        _id
        projectTitle
        projectBody
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
      createdAt
      profileImage
      friends {
        _id
        username
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
    createdBy {
      _id
      username
    }
    createdAt
    repoLink
    deployedLink
    lastEditedAt
    replyCount
  }
}
`;

export const QUERY_PROJECT = gql`
query project($id: ID!) {
  project(_id: $id) {
    _id
    projectTitle
    projectBody
    createdBy {
      _id
      username
    }
    createdAt
    replyCount
    replies {
      _id
      replyBody
      replyCount
      replies {
        _id
        replyBody
      }
    }
  }
}
`;
