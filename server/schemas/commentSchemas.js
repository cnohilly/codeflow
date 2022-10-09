const { Project, Comment } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const CommentQueries = {
    comments: async (parent, { userId }) => {
        const params = userId ? { createdBy: userId } : {};
        return Comment.find(params)
            .sort({ createdAt: -1 })
            .populate(['createdBy',
                {
                    path: 'comments',
                    populate: ['createdBy', 'comments']
                }]);
    },
    comment: async (parent, { _id }) => {
        return Comment.findOne({ _id })
            .populate(['createdBy',
                {
                    path: 'comments',
                    populate: ['createdBy', 'comments', 'parentCommentId']
                }]);
    }
}

const CommentMutations = {
    addComment: async (parent, args, context) => {
        if (context.user) {
            let comment = await Comment.create({ ...args, createdBy: context.user._id });
            if (args.parentCommentId) {
                await Comment.findByIdAndUpdate(
                    { _id: args.parentCommentId },
                    { $push: { comments: comment._id } },
                    { new: true }
                );
            } else {

                await Project.findByIdAndUpdate(
                    { _id: args.projectId },
                    { $push: { comments: comment._id } },
                    { new: true }
                )
            }
            comment = await comment.populate('createdBy');

            return comment;
        }

        throw new AuthenticationError("You need to be logged in!");
    },
    editComment: async (parent, { _id, commentBody }, context) => {
        if (context.user) {
            const comment = await Comment.findOneAndUpdate(
                { _id, createdBy: context.user._id },
                { commentBody },
                { new: true }
            ).populate('createdBy');

            if (!comment) {
                throw new AuthenticationError("You do not have permission to do that!");
            }

            return comment;
        }

        throw new AuthenticationError("You need to be logged in!");
    },
    deleteComment: async (parent, { _id }, context) => {
        if (context.user) {
            const comment = await Comment.findOneAndUpdate(
                { _id, createdBy: context.user._id },
                { isDeleted: true },
                { new: true })
                .populate('createdBy');

            if (!comment) {
                throw new AuthenticationError("You do not have permission to do that!");
            }

            return comment;
        }

        throw new AuthenticationError("You need to be logged in!");
    },
    updateCommentLike: async (parent, { _id }, context) => {
        if (context.user) {
            let comment = await Comment.findById(_id);

            const updateParams = comment.likes.includes(context.user._id) ? { $pull: { likes: context.user._id } } : { $addToSet: { likes: context.user._id } };

            comment = Comment.findByIdAndUpdate(_id, updateParams, { new: true })
                .populate(['createdBy', 'likes', 'comments']);

            if (!comment) {
                throw new AuthenticationError("You do not have permission to do that!");
            }

            return comment;
        }

        throw new AuthenticationError("You need to be logged in!");
    }
}

module.exports = { CommentQueries, CommentMutations };