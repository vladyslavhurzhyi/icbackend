require("dotenv").config();

const { LoginHistory } = require("../../models/loginHistory");
const { ctrlWrapper, HttpError } = require("../../utils");

const getAllHistory = async (req, res) => {
  const result = await LoginHistory.find({});

  if (!result) {
    throw HttpError(404, "Not Found");
  }
  res.json(result);
};

module.exports = {
  loginHistory: ctrlWrapper(getAllHistory),
};
