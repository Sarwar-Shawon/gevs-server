const mongoose = require("mongoose");
const { Schema } = mongoose;
const partySchema = new mongoose.Schema({
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
module.exports = mongoose.model("Party", partySchema);
