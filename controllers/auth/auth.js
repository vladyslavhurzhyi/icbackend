const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const http = require("http");

require("dotenv").config();

const { SECRET_KEY } = process.env;

const { User } = require("../../models/user");

const { ctrlWrapper, HttpError } = require("../../utils");

const register = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user) {
    throw HttpError(409, "Username already in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ ...req.body, password: hashPassword });

  res.status(201).json({
    user: {
      username: newUser.username,
      admin: false,
    },
  });
};

const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    throw HttpError(401, "Username or password is wrong");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Username or password is wrong");
  }

  const ip = req.connection.remoteAddress;
  console.log(ip);
  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token, ip });
  res.json({
    token: token,

    user: {
      username: user.username,
      admin: user.admin,
      ip,
    },
  });
};

const current = (req, res) => {
  const { username, admin } = req.user;

  res.json({ username, admin });
};

// const logout = async (req, res) => {
//   const { _id } = req.user;
//   await User.findByIdAndUpdate(_id, { token: "" });
//   res.json({
//     message: "logout sucsses",
//   });
// };

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  current: ctrlWrapper(current),
};
