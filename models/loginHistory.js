const { Schema, model } = require("mongoose");

const handleMongooseError = require("../utils/handleMongooseError");

const loginHistorySchema = Schema({
  username: {
    type: String,
    default: null,
  },

  timestamp: {
    type: String,
    default: null,
  },
  ip: {
    type: String,
    default: null,
  },
  ua: {
    type: Object,
    default: null,
  },
});

loginHistorySchema.post("save", handleMongooseError);

const LoginHistory = model("loginhistories", loginHistorySchema);

module.exports = { LoginHistory };
