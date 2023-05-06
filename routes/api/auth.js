const express = require("express");

const validateBody = require("../../middlewares/validateBody");

const ctrl = require("../../controllers/auth/auth");

const { schemas } = require("../../models/user");
const { authenticate } = require("../../middlewares/authenticate");

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

router.post("/login", validateBody(schemas.registerSchema), ctrl.login);

router.get("/current", authenticate, ctrl.current);

router.post("/logout", authenticate, ctrl.logout);

module.exports = router;
