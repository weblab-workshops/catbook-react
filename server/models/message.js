const mongoose = require("mongoose");

//define a message schema for the database
const MessageSchema = new mongoose.Schema({});

// compile model from schema
module.exports = mongoose.model("message", MessageSchema);
