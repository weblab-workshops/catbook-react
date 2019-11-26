const mongoose = require("mongoose");

//define a message schema for the database
const MessageSchema = new mongoose.Schema({
  sender: {
    _id: String,
    name: String,
  },
  recipient: {
    _id: String,
    name: String,
  },
  timestamp: { type: Date, default: Date.now },
  content: String,
});

// compile model from schema
module.exports = mongoose.model("message", MessageSchema);
