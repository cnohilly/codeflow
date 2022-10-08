const { User, Post, Comment, Reply } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password')
                    .populate([
                        {
                            path: 'friends',
                            populate: 'friends'
                        },
                        {
                            path: 'posts',
                            populate: 'createdBy'
                        }
                    ]);

                return userData;

            }

            throw new AuthenticationError('Not logged in');
        },
        users: async () => {
            return User.find()
                .select('-__v -password')
                .populate(['posts', 'friends']);
        },
        user: async (parent, { input }) => {
            return User.findOne({ ...input })
                .select('-__v -password')
                .populate(['posts', 'friends']);
        },
        posts: async (parent, { userId }) => {
            if (userId) {
                return User.findById(userId)
                    .select('posts')
                    .sort({ createdAt: -1 })
                    .populate(['createdBy',
                        {
                            path: 'replies',
                            populate: ['createdBy', 'replies']
                        }]);
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
                .populate(['createdBy',
                    {
                        path: 'replies',
                        populate: ['createdBy', 'replies', 'parentReplyId']
                    }]);
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
                let post = await Post.create({ ...args, createdBy: context.user._id });

                await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { posts: post._id } },
                    { new: true }
                );

                post = await post.populate('createdBy');

                return post;
            }

            throw new AuthenticationError("You need to be logged in!");
        },
        addReply: async (parent, args, context) => {
            if (context.user) {
                let reply = await Reply.create({ ...args, createdBy: context.user._id });
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

                return reply;
            }

            throw new AuthenticationError("You need to be logged in!");
        },
        editUser: async (parent, { input, _id }, context) => {
            if (context.user) {
                if (context.user._id === _id) {
                    const user = await User.findByIdAndUpdate(
                        _id,
                        { ...input },
                        { new: true }
                    ).select('-__v -password')
                        .populate('posts');

                    const token = signToken(user);

                    return { token, user };
                }
            }

            throw new AuthenticationError("You need to be logged in!");
        },
        deleteUser: async (parent, { _id }, context) => {
            if (context.user) {
                if (context.user._id === _id) {
                    const user = await User.findByIdAndDelete(_id);

                    return user;
                }
                throw new AuthenticationError("You do not have permission to do that!");

            }

            throw new AuthenticationError("You need to be logged in!");
        },
        deletePost: async (parent, { _id }, context) => {
            if (context.user) {
                const post = await Post.findOneAndDelete({ _id, createdBy: context.user._id })
                    .populate('createdBy');

                if (!post) {
                    throw new AuthenticationError("You do not have permission to do that!");
                }

                await Reply.deleteMany({ postId: post._id });

                return post;
            }

            throw new AuthenticationError("You need to be logged in!");
        },
        deleteReply: async (parent, { _id }, context) => {
            if (context.user) {
                const reply = await Reply.findOneAndUpdate(
                    { _id, createdBy: context.user._id },
                    { isDeleted: true },
                    { new: true })
                    .populate('createdBy');

                if (!reply) {
                    throw new AuthenticationError("You do not have permission to do that!");
                }

                return reply;
            }

            throw new AuthenticationError("You need to be logged in!");
        }
    }
}

module.exports = resolvers;