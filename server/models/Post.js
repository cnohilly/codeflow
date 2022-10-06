const { Schema, model } = require('mongoose');
const { dateFormat } = require('../utils/helpers');
const replySchema = require('./Reply');

const postSchema = new Schema(
    {
        postText: {
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
        username: {
            type: String,
            required: true
        },
        replies: [replySchema]
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