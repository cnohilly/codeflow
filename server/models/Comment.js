const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/helpers');

const commentSchema = new Schema(
    {
        commentBody: {
            type: String,
            required: true,
            maxlength: 300
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            immutable: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp) => dateFormat(timestamp)
        },
        isDeleted: {
            type: Boolean,
            required: true,
            default: false
        },
        lastEditedAt: {
            type: Date,
            default: null,
            get: (timestamp) => dateFormat(timestamp)
        },
        projectId: {
            type: Schema.Types.ObjectId,
            ref: 'Project',
            required: true
        },
        parentCommentId: {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        },
        comments: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Comment'
            }
        ],
        likes: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        toJSON: {
            getters: true
        }
    }
);

commentSchema.virtual('commentCount').get(function () {
    return (this.comments ? this.comments.length : 0);
});

commentSchema.virtual('likeCount').get(function () {
    return (this.likes ? this.likes.length : 0);
});

commentSchema.pre('findOneAndUpdate', function (next) {
    if (this._update.commentBody) {
        this._update = { ...this.getUpdate(), lastEditedAt: Date.now() };
    }
    next();
});

const Comment = model('Comment', commentSchema);

module.exports = Comment;