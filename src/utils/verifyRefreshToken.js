/*
 * @copyRight by md sarwar hoshen.
 */
const jwt = require("jsonwebtoken");
const UserToken = require("../models/userToken");
//
const verifyRefreshToken = async (refreshToken) => {
  const privateKey = process.env.REFRESH_TOKEN_PRIVATE_KEY;
  //
  const user = await UserToken.findOne({ token: refreshToken });
  return new Promise((resolve, reject) => {
    jwt.verify(user.token, privateKey, (err, tokenDetails) => {
      if (err) return reject({ error: true, message: "Invalid refresh token" });
      resolve({
        tokenDetails,
        error: false,
        message: "Valid refresh token",
      });
    });
  });
};
module.exports = {
  verifyRefreshToken,
};
