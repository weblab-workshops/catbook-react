import mongoose, { Document, Schema } from "mongoose";

// Define an interface to represent a Comment document
interface IComment extends Document {
  creator_id: string;
  creator_name: string;
  parent: string; // Links to the _id of a parent story
  content: string;
}

// Define a comment schema for the database
const CommentSchema: Schema<IComment> = new Schema({
  creator_id: { type: String, required: true },
  creator_name: { type: String, required: true },
  parent: { type: String, required: true }, // Links to the _id of a parent story
  content: { type: String, required: true },
});

// Compile model from schema
const Comment = mongoose.model<IComment>("Comment", CommentSchema);

export default Comment;
