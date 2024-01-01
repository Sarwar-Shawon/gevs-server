/*
 * @copyRight by md sarwar hoshen.
 */
const mongoose = require("mongoose");
//
const electionScheduleSchema = new mongoose.Schema({
  settingsId: {
    type: String,
    required: true,
    default: "Shangri-La-Election",
  },
  status: {
    type: String,
    required: true,
    default: "not-started",
  },
});
module.exports = mongoose.model("ElectionSettings", electionScheduleSchema);
