const { gql } = require('apollo-server-express');

const typeDefs = gql`

    type User {
        _id: ID
        username: String
        email: String
        profileImage: String
        friends: [User]
        posts: [Post]
    }

    type Post {
        _id: ID
        postBody: String
        createdAt: String
        createdBy: User
        repoLink: String
        deployedLink: String
        replyCount: Int
        replies: [Reply]
    }

    type Reply {
        _id: ID
        replyBody: String
        createdAt: String
        createdBy: User
        postId: Post
        parentReplyId: Reply
        isDeleted: Boolean
        replyCount: Int
        replies: [Reply]
    }

    type Auth {
        token: ID!
        user: User   
    }
    
    input EditUserInput {
        username: String,
        email: String,
        password: String,
        profileImage: String
    }

    input UserSearchInput {
        _id: ID
        username: String,
    }
    
    type Query {
        me: User
        users: [User]
        user(input: UserSearchInput!): User
        posts(userId: ID): [Post]
        post(_id: ID!): Post
        replies(userId: ID): [Reply]
        reply(_id: ID!): Reply
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        addPost(postBody: String!): Post
        addReply(postId: ID!, parentReplyId: ID, replyBody: String!): Reply
        editUser(input: EditUserInput, _id: ID!): Auth
        deleteUser(_id: ID!): User
        deletePost(_id: ID!): Post
        deleteReply(_id: ID!): Reply
    }
`;

module.exports = typeDefs;