const { Post, Reply } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const ReplyQueries = {
    replies: async (parent, { userId }) => {
        const params = userId ? { createdBy: userId } : {};
        return Reply.find(params)
            .sort({ createdAt: -1 })
            .populate(['createdBy',
                {
                    path: 'replies',
                    populate: ['createdBy', 'replies']
                }]);
    },
    reply: async (parent, { _id }) => {
        return Reply.findOne({ _id })
            .populate(['createdBy',
                {
                    path: 'replies',
                    populate: ['createdBy', 'replies', 'parentReplyId']
                }]);
    }
}

const ReplyMutations = {
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
    editReply: async (parent, {_id, replyBody}, context) => {
        if (context.user) {
            const reply = await Reply.findOneAndUpdate(
                {_id, createdBy: context.user._id},
                {replyBody},
                {new: true}
            ).populate('createdBy');

            if (!reply) {
                throw new AuthenticationError("You do not have permission to do that!");
            }

            return reply;
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
    },
    updateReplyLike: async (parent, { _id }, context) => {
        if (context.user) {
            let reply = await Reply.findById(_id);

            const updateParams = reply.likes.includes(context.user._id) ? { $pull: { likes: context.user._id } } : { $addToSet: { likes: context.user._id } };

            reply = Reply.findByIdAndUpdate(_id, updateParams, { new: true })
                .populate(['createdBy', 'likes', 'replies']);

            if (!reply) {
                throw new AuthenticationError("You do not have permission to do that!");
            }

            return reply;
        }

        throw new AuthenticationError("You need to be logged in!");
    }
}

module.exports = { ReplyQueries, ReplyMutations };