/*
 * @copyRight by md sarwar hoshen.
 */
const bcrypt = require("bcrypt");
//hash password
async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
}
// compare password
async function comparePassword(password, hash_password) {
  try {
    return await bcrypt.compare(password, hash_password);
  } catch (err) {
    throw err;
  }
}
//
module.exports = {
  hashPassword,
  comparePassword,
};
