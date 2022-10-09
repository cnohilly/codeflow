const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/helpers');

const projectSchema = new Schema(
    {
        projectTitle: {
            type: String,
            required: 'Project must have a title',
            minlength: 1,
            maxlength: 50
        },
        projectBody: {
            type: String,
            required: 'Project must include text.',
            minlength: 1,
            maxlength: 300
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: dateFormat
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
        lastEditedAt: {
            type: Date,
            default: null,
            get: dateFormat
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

projectSchema.virtual('replyCount').get(function () {
    return (this.replies ? this.replies.length : 0);
});

projectSchema.pre('findOneAndUpdate', function (next) {
    this._update = { ...this.getUpdate(), lastEditedAt: Date.now() };
    next();
});


const Project = model('Project', projectSchema);

module.exports = Project;