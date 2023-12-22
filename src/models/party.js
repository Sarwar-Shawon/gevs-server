/*
 * @copyRight by md sarwar hoshen.
 */
const mongoose = require("mongoose");
//
const partySchema = new mongoose.Schema({
  // party_id: {
  //   type: Number,
  //   unique: true,
  //   required: true,
  // },
  party: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("Party", partySchema);
