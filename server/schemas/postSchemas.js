const { User, Post, Reply } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const PostQueries = {
    posts: async (parent, { userId }) => {
        const params = userId ? { createdBy: userId } : {};
        return Post.find(params)
            .sort({ createdAt: -1 })
            .populate(['createdBy',
                {
                    path: 'replies',
                    populate: ['createdBy', 'replies']
                }]);
    },
    post: async (parent, { _id }) => {
        return Post.findOne({ _id })
            .populate(['createdBy',
                {
                    path: 'replies',
                    populate: ['createdBy', 'replies', 'parentReplyId']
                }]);
    }
}

const PostMutations = {
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
    editPost: async (parent, {_id, input}, context) => {
        if (context.user) {
            const now = Date.now();

            let post = await Post.findOneAndUpdate(
                {_id, createdBy: context.user._id},
                {...input},
                {new: true}
            ).populate(['createdBy']);

            if (!post) {
                throw new AuthenticationError("You do not have permsission to do that!");
            }

            return post;
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
    }
}

module.exports = { PostQueries, PostMutations };