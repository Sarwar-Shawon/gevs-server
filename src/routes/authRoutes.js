/*
 * @copyRight by md sarwar hoshen.
 */
const express = require("express");
const authController = require("../controllers/authController");
const { registerValidator, loginValidator } = require("../utils/validator");
const authRouter = express.Router();
//
authRouter.route("/register").post(authController.signUpVoter);
authRouter.route("/login").post(loginValidator, authController.login);
//
module.exports = authRouter;
