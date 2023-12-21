/*
 * @copyRight by md sarwar hoshen.
 */
const mongoose = require("mongoose");
//
const UvcSchema = new mongoose.Schema({
  UVC: {
    type: String,
    required: true,
    unique: true,
  },
  used: {
    type: Number,
    default: 0,
  },
});
module.exports = mongoose.model("Uvc", UvcSchema);
