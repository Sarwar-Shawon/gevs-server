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
  party_name: {
    type: String,
    required: true,
  },
  constituency_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  constituency_name: {
    type: String,
    required: true,
  },
  vote_count: {
    type: Number,
    required: true,
  },
});
module.exports = mongoose.model("Candidate", candidateSchema);
//

// {
//   "candidate": "Md Sarwar",
//  "party_id": "6585d70279483284b21a2781",
//  "party_name": "Blue Party",
//  "constituency_id":"6585d6b979483284b21a2777",
//  "constituency_name": "Shangri-la-Town",
//  "vote_count": 0
// }
