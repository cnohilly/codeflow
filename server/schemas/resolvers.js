const { User, Post, Reply } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
            return User.find()
                .select('-__v -password')
                .populate('posts');
        },
        user: async (parent, { username }) => {
            return User.findOne({ username })
                .select('-__v -password')
                .populate('posts');
        },
        posts: async (parent, { userId }) => {
            if (userId) {
                return User.findById(userId)
                    .select('posts')
                    .sort({ createdAt: -1 })
                    .populate('createdBy')
                    .populate('replies');
            }
            return Post.find()
                .sort({ createdAt: -1 })
                .populate('createdBy')
                .populate({
                    path: 'replies',
                    populate: ['createdBy', 'replies']
                });
        },
        post: async (parent, { _id }) => {
            return Post.findOne({ _id })
                .populate('replies')
                .populate('createdBy');
        }
    },

    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);

            return { token, user };
        },
        addPost: async (parent, args, context) => {
            if (context.user) {
                const post = await Post.create({ ...args, createdBy: context.user._id });
                // .populate('createdBy')
                // .populate('replies');

                await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { posts: post._id } },
                    { new: true }
                );

                return post;
            }

            throw new AuthenticationError("You need to be logged in!");
        },
        addReply: async (parent, args, context) => {
            if (context.user) {
                let reply = await Reply.create({ ...args, createdBy: context.user._id });
                console.log(args.parentReplyId);
                if (args.parentReplyId) {
                    await Reply.findByIdAndUpdate(
                        { _id: args.parentReplyId },
                        { $push: { replies: reply._id } },
                        { new: true }
                    );
                } else {

                    await Post.findByIdAndUpdate(
                        { _id: args.postId },
                        { $push: { replies: reply._id } },
                        { new: true }
                    )
                }
                reply = await reply.populate('createdBy');
                reply = await reply.populate('replies');

                return reply;
            }

            throw new AuthenticationError("You need to be logged in!");
        }
    }
}

module.exports = resolvers;