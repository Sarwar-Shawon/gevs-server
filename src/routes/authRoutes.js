/*
 * @copyRight by md sarwar hoshen.
 */
const express = require("express");
const authController = require("../controllers/authController");
const { registerValidator, loginValidator } = require("../utils/validator");
const { auth } = require("../middleware/auth");

const authRouter = express.Router();
//
authRouter
  .route("/register")
  .post(registerValidator, authController.signUpVoter);
authRouter.route("/login").post(loginValidator, authController.login);
authRouter.route("/refreshToken").post(authController.CreateNewAccessToken);
authRouter.route("/logout").post(auth, authController.logout);

//
module.exports = authRouter;
