const { Schema, model } = require('mongoose');
const { dateFormat } = require('../utils/helpers');

const replySchema = new Schema(
    {
        replyBody: {
            type: String,
            required: true,
            maxlength: 300
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: date => dateFormat(date)
        },
        replies: [replySchema]
    },
    {
        toJSON: {
            getters: true
        }
    }
);

module.exports = replySchema;