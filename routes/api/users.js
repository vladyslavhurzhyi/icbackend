const express = require("express");
const getAllUsers = require("../../controllers/users/getUsers");

const { authenticate } = require("../../middlewares/authenticate");

const router = express.Router();

router.get("/getallusers", authenticate, getAllUsers);

module.exports = router;
