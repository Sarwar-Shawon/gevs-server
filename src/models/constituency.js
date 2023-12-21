const mongoose = require("mongoose");
const { Schema } = mongoose;
const constituencySchema = new mongoose.Schema({
  consitituency_id: {
    type: Number,
    unique: true,
    required: true,
  },
  constituency_name: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("Constituency", constituencySchema);
