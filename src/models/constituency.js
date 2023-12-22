/*
 * @copyRight by md sarwar hoshen.
 */
const mongoose = require("mongoose");
//
const constituencySchema = new mongoose.Schema({
  constituency_name: {
    type: String,
    required: true,
    // unique: true,
  },
});
module.exports = mongoose.model("Constituency", constituencySchema);
