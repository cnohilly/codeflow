const { gql } = require('apollo-server-express');

const typeDefs = gql`

    type User {
        _id: ID
        username: String
        email: String
    }

    type Post {
        _id: ID
        postText: String
        username: String
        createdAt: String
        reactionCount: Int
        reactions: [Reaction]
    }

    type Reply {
        _id: ID
        replyBody: String
        createdAt: String
        username: String
        replies: [Reply]
    }

    type Auth {
        token: ID!
        user: User   
    }

    type Query {
        users: [User]
        user(username: String!): String
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
    }
`;

module.exports = typeDefs;