const { User } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const UserQueries = {
    users: async () => {
        return User.find()
            .select("-__v -password")
            .populate(["projects", "friends"]);
    },
    user: async (parent, { input }) => {
        return User.findOne({ ...input })
            .select("-__v -password")
            .populate(["projects", "friends"]);
    },
};

const UserMutations = {
    addUser: async (parent, args) => {
        const user = await User.create(args);
        const token = signToken(user);

        return { token, user };
    },
    editUser: async (parent, { input, _id }, context) => {
        if (context.user) {
            if (context.user._id === _id) {
                const user = await User.findByIdAndUpdate(
                    _id,
                    { ...input },
                    { new: true }
                )
                    .select("-__v -password")
                    .populate("projects");

                const token = signToken(user);

                return { token, user };
            }
        }

        throw new AuthenticationError("You need to be logged in!");
    },
    addFriend: async (parent, { _id }, context) => {
        if (context.user) {
            if (context.user._id !== _id) {
                const user = await User.findByIdAndUpdate(
                    context.user._id,
                    { $addToSet: { friends: _id } },
                    { new: true }
                ).select('-__v -password')
                    .populate(['projects', 'friends']);

                return user
            }
        }

        throw new AuthenticationError("You need to be logged in!");
    },
    deleteUser: async (parent, { _id }, context) => {
        if (context.user) {
            if (context.user._id === _id) {
                const user = await User.findByIdAndDelete(_id);

                return user;
            }
            throw new AuthenticationError("You do not have permission to do that!");
        }

        throw new AuthenticationError("You need to be logged in!");
    },
}

module.exports = { UserQueries, UserMutations };
