const { check } = require("express-validator");
//
const loginValidator = [
  check("voter_id")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),
  check("password").notEmpty().withMessage("Password is required"),
];
//
const registerValidator = [
  // body("voter_id", "voter id does not Empty").isEmail(),
  // body("full_name", "username does not Empty").not().isEmpty(),
  // body("UVC", "uvc does not Empty").not().isEmpty(),
  // body("constituency_id", "constituency does not Empty").not().isEmpty(),
  // body("user.password", "The minimum password length is 6 characters").isLength(
  //   { min: 6 }
  // ),
];
module.exports = {
  loginValidator,
  registerValidator,
};
