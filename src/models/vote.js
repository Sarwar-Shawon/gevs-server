/*
 * @copyRight by md sarwar hoshen.
 */
const mongoose = require("mongoose");
//
const VoteSchema = new mongoose.Schema({
  voter_id: {
    type: String,
    required: true,
    unique: true,
  },
  uvc: {
    type: String,
    required: true,
    unique: true,
  },
  candidate_id: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("Vote", VoteSchema);
