const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/helpers');

const replySchema = new Schema(
    {
        replyBody: {
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
        postId: {
            type: Schema.Types.ObjectId,
            ref: 'Post',
            required: true
        },
        parentReplyId: {
            type: Schema.Types.ObjectId,
            ref: 'Reply'
        },
        replies: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Reply'
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

replySchema.virtual('replyCount').get(function () {
    return (this.replies ? this.replies.length : 0);
});

replySchema.virtual('likeCount').get(function () {
    return (this.likes ? this.likes.length : 0);
});

replySchema.pre('findOneAndUpdate', function(next){
    this._update = {...this.getUpdate(), lastEditedAt: Date.now()};
    console.log(this._update);
    next();
});

const Reply = model('Reply', replySchema);

module.exports = Reply;