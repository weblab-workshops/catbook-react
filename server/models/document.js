const mongoose = require("mongoose");

const DocumentSchema = new mongoose.Schema({
  content: String,
});

// compile model from schema
module.exports = mongoose.model("document", DocumentSchema);
