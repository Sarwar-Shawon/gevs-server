/*
 * @copyRight by md sarwar hoshen.
 */
const Voter = require("../models/voter");
const Uvc = require("../models/uvc");
const jwt = require("jsonwebtoken");
const UserToken = require("../models/userToken");
const { validationResult } = require("express-validator");
const { generateTokens } = require("../utils/generateTokens");
const { verifyRefreshToken } = require("../utils/verifyRefreshToken");
const { hashPassword, comparePassword } = require("../utils/encryptPassword");
//to register new voter
const signUpVoter = async (req, res) => {
  try {
    console.log("params:", req.body);
    //check uvc is already used or not
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   return res.status(422).json({ errors: errors.array() });
    // }
    //
    const uvc = await Uvc.findOne({ UVC: req.body.UVC });
    if (!uvc) {
      return res.send({
        status: "err",
        message: "The provided UVC does not exist.",
      });
    }
    if (uvc.used) {
      return res.send({
        status: "uvc exists",
        message:
          "You need to use a new UVC because the given one has already been used.",
      });
    }
    //hash password
    const hash_password = await hashPassword(req.body.password);
    //
    const voter = new Voter({
      voter_id: req.body.voter_id,
      full_name: req.body.full_name,
      DOB: req.body.DOB,
      password: hash_password,
      UVC: req.body.UVC,
      constituency_id: req.body.constituency_id,
      user_type: req.body.user_type || "voter",
    });
    //save to db
    await voter.save();
    //update uvc
    uvc.used = 1;
    await uvc.save();
    //return response
    return res.send({
      status: "success",
      message: "You've successfully registered as a new voter.",
    });
  } catch (err) {
    //return err
    if (err.code == "11000") {
      res.send({ status: "exists", message: "User Email Already Exists." });
    } else {
      res.send({ status: "err", message: err?.message });
    }
  }
};
// to sign in
const login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    // console.log(req.body);
    const voter = await Voter.findOne({ voter_id: req.body.voter_id });
    // console.log("voter::", voter);
    if (voter) {
      const matchPass = await comparePassword(
        req.body.password,
        voter.password
      );
      console.log("matchPass", matchPass);
      if (matchPass) {
        const { accessToken, refreshToken } = await generateTokens(voter);
        return res.send({
          status: "success",
          message: "You've successfully signed in",
          data: {
            user_type: voter.user_type,
            uvc: voter.UVC,
            user_name: voter.full_name,
            accessToken,
            refreshToken,
          },
        });
      } else {
        res.send({ status: "err", message: "password doesn't match" });
      }
    } else {
      return res.send({
        status: "err",
        message: "No user found.",
      });
    }
  } catch (err) {
    res.send({
      status: "err",
      message:
        err?.message === "data and hash arguments required"
          ? "Password doesn't match."
          : err?.message,
    });
  }
};
// to sign in
const logout = async (req, res) => {
  try {
    const userToken = await UserToken.findOne({ token: req.body.refreshToken });
    if (!userToken)
      return res
        .status(200)
        .send({ status: "success", message: "Logged Out Sucessfully" });
    await userToken.deleteOne();
    res
      .status(200)
      .send({ status: "success", message: "Logged Out Sucessfully" });
  } catch (err) {
    console.log(err);
    res.send({ status: "err", message: "Internal Server Error" });
  }
};
//
const CreateNewAccessToken = async (req, res) => {
  console.log("req.body.refreshToken", req.body.refreshToken);
  try {
    const tokenDetails = await verifyRefreshToken(req.body.refreshToken);
    console.log("tokenDetails", tokenDetails);
    const payload = { _id: tokenDetails._id, roles: tokenDetails.roles };
    const accessToken = jwt.sign(
      payload,
      process.env.ACCESS_TOKEN_PRIVATE_KEY,
      {
        expiresIn: "14m",
      }
    );
    res.send({
      status: "success",
      accessToken,
      message: "Access token created successfully",
    });
  } catch (err) {}
};
//
module.exports = {
  signUpVoter,
  login,
  logout,
  CreateNewAccessToken,
};
