const { Schema, model } = require('mongoose');
const { dateFormat } = require('../utils/helpers');
const { Reply } = require('../models');

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
    console.log("Deleting Post and Replies");
    // const doc = await this.model.findOne(this.getFilter());
    await Reply.deleteMany({ postId: this._id });
    // console.log(this.replies);
    // if (this.replies) {
    //     this.replies.forEach(reply => {
    //         console.log(reply);
    //         reply.remove();
    //     });
    // }
}

postSchema.pre('findOneAndDelete', { document: false, query: true }, preDelete);
postSchema.pre('deleteMany', { document: false, query: true }, preDelete);

const Post = model('Post', postSchema);

module.exports = Post;