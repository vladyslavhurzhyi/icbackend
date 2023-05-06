const { Schema, model } = require("mongoose");
const Joi = require("joi");
const handleMongooseError = require("../utils/handleMongooseError");

const userSchema = Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
    },
    admin: {
      type: Boolean,
      default: false,
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestapms: true }
);

userSchema.post("save", handleMongooseError);

const User = model("user", userSchema);

const registerSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

const schemas = {
  registerSchema,
  loginSchema,
};

module.exports = { schemas, User };