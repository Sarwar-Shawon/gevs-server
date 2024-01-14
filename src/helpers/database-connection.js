/*
 * @copyRight by md sarwar hoshen.
 */
var mongoose = require("mongoose");
const db = require("../configs/db");
async function mongooseConnection() {
  try {
    await mongoose.connect(db.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // other options as needed
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
}
module.exports = mongooseConnection;
