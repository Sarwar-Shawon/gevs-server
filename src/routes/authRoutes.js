const express = require("express");
const authController = require("../controllers/authController");
const authRouter = express.Router();
//
authRouter.route("/register").post(authController.signUpVoter);
authRouter.route("/login").post(authController.login);
//
module.exports = authRouter;
