const { Schema, model } = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      require: true,
    },
    name: {
      type: String,
    },
    sid: {
      type: String,
    },
    prompt: {
      type: Array,
    },
    interest: {
      type: Array,
    },
    socialprofile: {
      type: Array,
    },
    followers: {
      type: Array,
      default: [],
    },
    followings: {
      type: Array,
      default: [],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    prompt: {
      type: Array,
    },
    interest: {
      type: Array,
    },
    socialprofile: {
      type: Array,
    },
    relationships: {
      type: Number,
      enum: [1, 2, 3],
    },
    like: {
      type: Array,
      default:[],
    }
  },
  { timestamps: true }
);

userSchema.methods.generateJWT = function () {
  const token = jwt.sign(
    {
      _id: this.id,
      email: this.email,
      name: this.name,
      sid:this.sid,
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "1d" }
  );
  return token;
};

module.exports.User = model("User", userSchema);