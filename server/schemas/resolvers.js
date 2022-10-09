const { User, Project, Reply } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const { UserQueries, UserMutations } = require('./userSchemas');
const { ProjectQueries, ProjectMutations } = require('./projectSchemas');
const { ReplyQueries, ReplyMutations } = require('./replySchemas');

const resolvers = {
    Query: {
        ...UserQueries,
        ...ProjectQueries,
        ...ReplyQueries,
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password')
                    .populate([
                        {
                            path: 'friends',
                            populate: 'friends'
                        },
                        {
                            path: 'projects',
                            populate: 'createdBy'
                        }
                    ]);

                return userData;

            }

            throw new AuthenticationError('Not logged in');
        },
    },

    Mutation: {
        ...UserMutations,
        ...ProjectMutations,
        ...ReplyMutations,
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);

            return { token, user };
        }
    }
}

module.exports = resolvers;