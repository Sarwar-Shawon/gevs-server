/*
 * @copyRight by md sarwar hoshen.
 */
const { check } = require("express-validator");
//login Validator
const loginValidator = [
  check("voter_id")
    .notEmpty()
    .withMessage("Voter Id is required")
    .bail()
    .isEmail()
    .withMessage("Invalid email format"),
  check("password").notEmpty().withMessage("Password is required"),
];
//register Validator
const registerValidator = [
  check("voter_id")
    .notEmpty()
    .withMessage("Voter id is required")
    .bail()
    .isEmail()
    .withMessage("Invalid email format"),
  check("password").notEmpty().withMessage("Password is required"),
  check("UVC").notEmpty().withMessage("UVC is required"),
  check("constituency_id").notEmpty().withMessage("Constituency is required"),
];
//
module.exports = {
  loginValidator,
  registerValidator,
};
