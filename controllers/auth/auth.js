const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const info = require("request-info");

const geoip = require("geoip-lite");

const sendMsgInTG = require("../../utils/sendTelegramMessage");

const { format } = require("date-fns");

require("dotenv").config();

const { SECRET_KEY, DEMO_TOKEN } = process.env;

const { User } = require("../../models/user");
const requestIp = require("request-ip");
const { ctrlWrapper, HttpError } = require("../../utils");
const { LoginHistory } = require("../../models/loginHistory");

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

  const clientIp = requestIp.getClientIp(req);
  const { ua } = info(req);

  const payload = {
    id: user._id,
  };

  const geoData = geoip.lookup(clientIp);

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

  if (
    (user.ip !== clientIp || ua.ua !== user.ua.ua) &&
    user.username !== "demo"
  ) {
    sendMsgInTG(
      `${
        user.username
      } \n зашел с нового ip/device. \n Новый ip - ${clientIp}. \n ${
        geoData.country
      } ${geoData.region} ${geoData.city} \n Useragent - ${JSON.stringify(
        ua.ua
      )}`
    );
    await User.findByIdAndUpdate(user._id, {
      oldIp: user.ip,
      oldData: user.ua,
    });
  }

  const userLog = {
    username: user.username,
    timestamp: format(Date.now(), "yyyy-MM-dd HH:mm:ss"),
    ip: clientIp,
    ua: ua.ua,
  };

  await LoginHistory.create(userLog);

  await User.findByIdAndUpdate(user._id, {
    ua,
    token,
    ip: clientIp,
    timestamp: format(Date.now(), "yyyy-MM-dd HH:mm:ss"),
  });

  res.json({
    token: token,
    user: {
      username: user.username,
      admin: user.admin,
      demo: user.demo,
    },
  });
};

const current = (req, res) => {
  const { username, admin, demo } = req.user;

  res.json({ username, admin, demo });
};

// const logout = async (req, res) => {
//   const { _id } = req.user;
//   await User.findByIdAndUpdate(_id, { token: "" });
//   res.json({
//     message: "logout sucsses",
//   });
// };

const getAllUsers = async (req, res) => {
  const { admin } = req.user;

  if (!admin) {
    throw HttpError(401, "Unauthorized");
  }

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
