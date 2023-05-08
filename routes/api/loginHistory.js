const express = require("express");

const validateBody = require("../../middlewares/validateBody");

const ctrl = require("../../controllers/auth/loginHistory");

const { schemas } = require("../../models/user");
const { authenticate } = require("../../middlewares/authenticate");

const router = express.Router();

router.get("/loginHistory", authenticate, ctrl.loginHistory);

module.exports = router;
