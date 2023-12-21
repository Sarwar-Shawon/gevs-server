const Voter = require("../models/voter");
const Uvc = require("../models/uvc_code");
const { hashPassword, comparePassword } = require("../utils/encryptPassword");
//to register new voter
const signUpVoter = async (req, res) => {
  try {
    //check uvc used or not
    const uvc = await Uvc.find({ UVC: req.body.UVC }).toArray();
    console.log("uvcuvcuvcuvc:::", uvc);
    if (used.length && uvc.used) {
      return res.status(200).json({
        status: "uvc exists",
        message:
          "You need to use a new UVC because the given one has already been used.",
      });
    }
    //hash password
    const hash_password = await hashPassword(req.body.password);
    //
    const voter = await new User({
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
    //return response
    res.status(200).json({
      status: "success",
      message: "You've successfully registered as a new voter.",
    });
  } catch (err) {
    //return err
    if (err.code == "11000") {
      res.send({ status: "exists", message: "User Email Already Exists." });
    } else {
      res.send({ status: "err", message: err });
    }
  }
};
// to sign in
const login = async (req, res) => {
  try {
    const voter = await Voter.find({ email: req.body.voter_id });
    console.log("voter::", voter);
  } catch (err) {
    res.send({ status: "err", message: err });
  }
};
//
module.exports = {
  signUpVoter,
  login,
};
