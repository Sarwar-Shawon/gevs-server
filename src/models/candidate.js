/*
 * @copyRight by md sarwar hoshen.
 */
const mongoose = require("mongoose");
//
const candidateSchema = new mongoose.Schema({
  // canid: {
  //   type: Number,
  //   unique: true,
  //   required: true,
  // },
  candidate: {
    type: String,
    required: true,
  },
  party_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  consitituency_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  vote_count: {
    type: Number,
    required: true,
  },
});
module.exports = mongoose.model("Candidate", candidateSchema);
