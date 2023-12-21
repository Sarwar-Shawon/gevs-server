/*
 * @copyRight by md sarwar hoshen.
 */
const mongoose = require("mongoose");
//
const voterSchema = new mongoose.Schema({
  voter_id: {
    type: String,
    required: true,
    unique: true,
  },
  full_name: {
    type: String,
    required: true,
  },
  DOB: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  UVC: {
    type: String,
    required: true,
  },
  constituency_id: {
    type: Number,
  },
  user_type: {
    type: String,
    default: "voter",
  },
});
module.exports = mongoose.model("Voter", voterSchema);
