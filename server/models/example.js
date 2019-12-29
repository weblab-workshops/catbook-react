const mongoose = require("mongoose");

const ExampleSchema = new mongoose.Schema({
  name: String,
});

// compile model from schema
module.exports = mongoose.model("example", ExampleSchema);
