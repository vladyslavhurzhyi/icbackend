const { User } = require("../../models/user");
const { HttpError } = require("../../utils");

const getAllUsers = async (req, res) => {
  // const { _id } = req.user;

  const result = await User.find({});

  if (!result) {
    throw HttpError(404, "Not Found");
  }
  res.json(result);
};

module.exports = getAllUsers;
