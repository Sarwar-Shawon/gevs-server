const bcrypt = require("bcrypt");

//hash password
async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
}
// compare password
async function comparePassword(password, hash_password) {
  return await bcrypt.compare(password, hash_password);
}
//
module.exports = {
  hashPassword,
  comparePassword,
};
