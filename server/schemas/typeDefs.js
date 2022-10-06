const { gql } = require('apollo-server-express');

const typeDefs = gql`

    type User {
        _id: ID
        username: String
        email: String
        posts: [Post]
    }

    type Post {
        _id: ID
        postBody: String
        createdBy: User
        createdAt: String
        replyCount: Int
        replies: [Reply]
    }

    type Reply {
        _id: ID
        replyBody: String
        createdAt: String
        createdBy: User
        replyCount: Int
        replies: [Reply]
    }

    type Auth {
        token: ID!
        user: User   
    }

    type Query {
        users: [User]
        user(username: String!): String
        posts: [Post]
        post(_id: ID!): Post
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        addPost(postBody: String!): Post
        addReply(postId: ID!, parentReplyId: ID, replyBody: String!): Reply
    }
`;

module.exports = typeDefs;