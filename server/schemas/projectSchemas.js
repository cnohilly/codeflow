const { User, Project, Comment } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const ProjectQueries = {
    projects: async (parent, { userId }) => {
        const params = userId ? { createdBy: userId } : {};
        return Project.find(params)
            .sort({ createdAt: -1 })
            .populate(['createdBy',
                {
                    path: 'comments',
                    populate: ['createdBy', 'comments']
                }]);
    },
    project: async (parent, { _id }) => {
        return Project.findOne({ _id })
            .populate(['createdBy',
                {
                    path: 'comments',
                    populate: ['createdBy', 'comments', 'parentCommentId']
                }]);
    }
}

const ProjectMutations = {
    addProject: async (parent, args, context) => {
        if (context.user) {
            let project = await Project.create({ ...args, createdBy: context.user._id });

            await User.findByIdAndUpdate(
                { _id: context.user._id },
                { $push: { projects: project._id } },
                { new: true }
            );

            project = await project.populate('createdBy');

            return project;
        }

        throw new AuthenticationError("You need to be logged in!");
    },
    editProject: async (parent, { _id, input }, context) => {
        if (context.user) {

            const project = await Project.findOneAndUpdate(
                { _id, createdBy: context.user._id },
                { ...input },
                { new: true }
            ).populate(['createdBy']);

            if (!project) {
                throw new AuthenticationError("You do not have permsission to do that!");
            }

            return project;
        }

        throw new AuthenticationError("You need to be logged in!");
    },
    deleteProject: async (parent, { _id }, context) => {
        if (context.user) {
            const project = await Project.findOneAndDelete({ _id, createdBy: context.user._id })
                .populate('createdBy');

            if (!project) {
                throw new AuthenticationError("You do not have permission to do that!");
            }

            await Comment.deleteMany({ projectId: project._id });

            return project;
        }

        throw new AuthenticationError("You need to be logged in!");
    }
}

module.exports = { ProjectQueries, ProjectMutations };