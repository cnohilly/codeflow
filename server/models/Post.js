const { Schema, model } = require('mongoose');
const { dateFormat } = require('../utils/helpers');
const { Reply } = require('./Reply');

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
            required: true
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

const preDelete = async () => {
    await Reply.deleteMany({ postId: this._id });
}

postSchema.pre('deleteOne', { document: false, query: true }, preDelete);
postSchema.pre('deleteMany', { document: true, query: true }, preDelete);

const Post = model('Post', postSchema);

module.exports = Post;