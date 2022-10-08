const { Schema, model } = require('mongoose');
const { dateFormat } = require('../utils/helpers');

const postSchema = new Schema(
    {
        postBody: {
            type: String,
            required: 'Post must include text.',
            minlength: 1,
            maxlength: 300
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: date => dateFormat(date)
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            immutable: true
        },
        repoLink: {
            type: String
        },
        deployedLink: {
            type: String
        },
        replies: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Reply'
            }
        ]
    },
    {
        toJSON: {
            getters: true
        }
    }
);

postSchema.virtual('replyCount').get(function () {
    return (this.replies ? this.replies.length : 0);
});

const Post = model('Post', postSchema);

module.exports = Post;