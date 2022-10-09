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
    createdAt: String
    createdBy: User
    repoLink: String
    deployedLink: String
    lastEditedAt: String
    replyCount: Int
    replies: [Reply]
  }

  type Reply {
    _id: ID
    replyBody: String
    createdAt: String
    createdBy: User
    projectId: Project
    parentReplyId: Reply
    isDeleted: Boolean
    lastEditedAt: String
    replyCount: Int
    replies: [Reply]
    likes: [User]
    likeCount: Int
  }

    type Auth {
        token: ID!
        user: User   
    }
    
    input UserSearchInput {
        _id: ID
        username: String,
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
        replies(userId: ID): [Reply]
        reply(_id: ID!): Reply
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        editUser(input: EditUserInput, _id: ID!): Auth
        deleteUser(_id: ID!): User
        addProject(projectBody: String!, repoLink: String, deployedLink: String): Project
        editProject(_id: ID!, input: EditProjectInput!): Project
        deleteProject(_id: ID!): Project
        addReply(projectId: ID!, parentReplyId: ID, replyBody: String!): Reply
        editReply(_id: ID!, replyBody: String!): Reply
        deleteReply(_id: ID!): Reply
        updateReplyLike(_id: ID!): Reply
    }
`;

module.exports = typeDefs;
