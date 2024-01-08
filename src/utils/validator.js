/*
 * @copyRight by md sarwar hoshen.
 */
const { check } = require("express-validator");
//login Validator
const loginValidator = [
  check("voter_id")
    .notEmpty()
    .withMessage("Voter Id is required")
    .isEmail()
    .withMessage("Invalid email format"),
  check("password").notEmpty().withMessage("Password is required"),
];
//register Validator
const registerValidator = [
  check("voter_id")
    .notEmpty()
    .withMessage("Voter id is required")
    .isEmail()
    .withMessage("Invalid email format"),
  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters")
    .matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
    .withMessage(
      "Password must contain at least one uppercase letter, one number, and one special character"
    ),
  check("UVC").notEmpty().withMessage("UVC is required"),
  check("constituency_id").notEmpty().withMessage("Constituency is required"),
];
//
module.exports = {
  loginValidator,
  registerValidator,
};
