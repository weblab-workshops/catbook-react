const mongoose = require("mongoose");

//define a story schema for the database
const StorySchema = new mongoose.Schema({
  // TODO (step 3.1): add creator_id
  creator_name: String,
  content: String,
});

// compile model from schema
module.exports = mongoose.model("story", StorySchema);
