const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    createdAt: String
    profileImage: String
    friends: [User]
    projects: [Project]
  }

  type Project {
    _id: ID
    projectTitle: String
    projectBody: String
    projectTags: String
    createdAt: String
    createdBy: User
    repoLink: String
    deployedLink: String
    lastEditedAt: String
    commentCount: Int
    comments: [Comment]
  }

  type Comment {
    _id: ID
    commentBody: String
    createdAt: String
    createdBy: User
    projectId: Project
    parentCommentId: Comment
    isDeleted: Boolean
    lastEditedAt: String
    commentCount: Int
    comments: [Comment]
    likes: [User]
    likeCount: Int
  }

  type Auth {
    token: ID!
    user: User
  }

  input UserSearchInput {
    _id: ID
    username: String
  }

  input EditUserInput {
    username: String
    email: String
    password: String
    profileImage: String
  }

  input EditProjectInput {
    projectTitle: String
    projectBody: String
    repoLink: String
    deployedLink: String
  }

  type Query {
    me: User
    users: [User]
    user(input: UserSearchInput!): User
    projects(userId: ID): [Project]
    project(_id: ID!): Project
    comments(userId: ID): [Comment]
    comment(_id: ID!): Comment
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    editUser(input: EditUserInput, _id: ID!): Auth
    deleteUser(_id: ID!): User
    addProject(
      projectTitle: String!
      projectTags: String!
      projectBody: String!
      repoLink: String
      deployedLink: String
    ): Project
    editProject(_id: ID!, input: EditProjectInput!): Project
    deleteProject(_id: ID!): Project
    addComment(
      projectId: ID!
      parentCommentId: ID
      commentBody: String!
    ): Comment
    editComment(_id: ID!, commentBody: String!): Comment
    deleteComment(_id: ID!): Comment
    updateCommentLike(_id: ID!): Comment
  }
`;

module.exports = typeDefs;
