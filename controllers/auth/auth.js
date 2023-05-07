const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const info = require("request-info");

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
  const { ua, ip } = info(req);

  const payload = {
    id: user._id,
  };

  if (user.ip !== ip) {
    await User.findByIdAndUpdate(user._id, {
      oldIp: ip,
      oldData: ua,
    });
  }

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, {
    oldData: ua,
    token,
    ip,
  });
  res.json({
    token: token,
    user: {
      username: user.username,
      admin: user.admin,
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

const getAllUsers = async (req, res) => {
  // const { _id } = req.user;

  const result = await User.find({});

  if (!result) {
    throw HttpError(404, "Not Found");
  }
  res.json(result);
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  current: ctrlWrapper(current),
  getUsersData: ctrlWrapper(getAllUsers),
};
