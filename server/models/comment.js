const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  creator_id: String,
  creator_name: String,
  parent: String,
  content: String
});

// compile model from schema
module.exports = mongoose.model("comment", CommentSchema);
