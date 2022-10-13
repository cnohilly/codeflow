const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const dateFormat = require("../utils/helpers");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, "Must match an email address!"],
  },
  // passwords must contain a capital, lowercase, number and special character. valid special characters: @$!%*?&.#~&*_-
  // example valid passwords: Password123! passWord?123 123pass-WORD || example invalid passwords: password123 password!123 PASSWORD!123
  password: {
    type: String,
    required: true,
    minlength: 5,
    match: [
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@$!%*?&.#~&*_-])[A-Za-z0-9@$!%*?&.#~&*_-]+$/,
      "Password must contain a capital letter, lowercase letter, a number, and a special character (@$!%*?&.#~&*_-).",
    ],
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  profileImage: {
    type: String,
    match: [/\.(jpg|jpeg|png|webp|svg)$/, "Must be a valid image link."],
    trim: true,
    default:
      "https://toppng.com/uploads/thumbnail/roger-berry-avatar-placeholder-115629915618zfpmweri9.png",
  },
  bio: {
    type: String,
    default: "Tell us about yourself!",
  },
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  projects: [
    {
      type: Schema.Types.ObjectId,
      ref: "Project",
    },
  ],
});

userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model("User", userSchema);

module.exports = User;
