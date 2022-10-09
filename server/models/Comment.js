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
            get: dateFormat
        },
        isDeleted: {
            type: Boolean,
            required: true,
            default: false
        },
        lastEditedAt: {
            type: Date,
            default: null,
            get: dateFormat
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
    return (this.replies ? this.replies.length : 0);
});

commentSchema.virtual('likeCount').get(function () {
    return (this.likes ? this.likes.length : 0);
});

commentSchema.pre('findOneAndUpdate', function (next) {
    this._update = { ...this.getUpdate(), lastEditedAt: Date.now() };
    console.log(this._update);
    next();
});

const Comment = model('Comment', commentSchema);

module.exports = Comment;