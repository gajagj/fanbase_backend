const mongoose = require("mongoose");

const fanSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  actorName: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  createdDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("Fanbase", fanSchema);
