import mongoose, { Document, Schema } from "mongoose";

// Define interfaces to represent the Sender and Recipient objects
interface IUser {
  _id: string;
  name: string;
}

// Define an interface to represent a Message document
interface IMessage extends Document {
  sender: IUser;
  recipient: IUser;
  timestamp: Date;
  content: string;
}

// Define a message schema for the database
const MessageSchema: Schema<IMessage> = new Schema({
  sender: {
    _id: { type: String, required: true },
    name: { type: String, required: true },
  },
  recipient: {
    _id: { type: String, required: true },
    name: { type: String, required: true },
  },
  timestamp: { type: Date, default: Date.now },
  content: { type: String, required: true },
});

// Compile model from schema
const Message = mongoose.model<IMessage>("Message", MessageSchema);

export default Message;
