/*
 * @copyRight by md sarwar hoshen.
 */
const jwt = require("jsonwebtoken");
const UserToken = require("../models/userToken");
//
const generateTokens = async (user) => {
  try {
    const payload = { _id: user._id, roles: user.user_type };
    const accessToken = jwt.sign(
      payload,
      process.env.ACCESS_TOKEN_PRIVATE_KEY,
      { expiresIn: "20m" }
    );
    const refreshToken = jwt.sign(
      payload,
      process.env.REFRESH_TOKEN_PRIVATE_KEY,
      { expiresIn: "30d" }
    );
    //
    const userToken = await UserToken.findOne({ userId: user._id });
    if (userToken) await userToken.deleteOne();
    //
    await new UserToken({ userId: user._id, token: refreshToken }).save();
    return Promise.resolve({ accessToken, refreshToken });
  } catch (err) {
    return Promise.reject(err);
  }
};
module.exports = {
  generateTokens,
};
