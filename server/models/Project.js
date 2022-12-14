const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/helpers");

const projectSchema = new Schema(
  {
    projectTitle: {
      type: String,
      required: "Project must have a title",
      minlength: 1,
      maxlength: 50,
    },
    projectBody: {
      type: String,
      required: "Project must include text.",
      minlength: 1,
      maxlength: 300,
    },
    projectTags: [{
      type: String,
      required: "Project must have tags.",
      minlength: 1,
      maxlength: 100,
    }],
    createdAt: {
      type: Date,
      default: Date.now,
      get: dateFormat,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      immutable: true,
    },
    repoLink: {
      type: String,
      match: [/^http(s?):\/\/.+$/, 'Must be a valid link starting with "http(s)://"']
    },
    deployedLink: {
      type: String,
      match: [/^http(s?):\/\/.+$/, 'Must be a valid link starting with "http(s)://"']
    },
    lastEditedAt: {
      type: Date,
      default: null,
      get: dateFormat,
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

projectSchema.virtual("commentCount").get(function () {
  return this.comments ? this.comments.length : 0;
});

projectSchema.pre("findOneAndUpdate", function (next) {
  this._update = { ...this.getUpdate(), lastEditedAt: Date.now() };
  next();
});

const Project = model("Project", projectSchema);

module.exports = Project;
