import mongoose, { Document, Schema } from "mongoose";

// Define an interface to represent a Story document
interface IStory extends Document {
  creator_id: string;
  creator_name: string;
  content: string;
}

// Define a story schema for the database
const StorySchema: Schema<IStory> = new Schema({
  creator_id: { type: String, required: true },
  creator_name: { type: String, required: true },
  content: { type: String, required: true },
});

// Compile model from schema
const Story = mongoose.model<IStory>("Story", StorySchema);

export default Story;
