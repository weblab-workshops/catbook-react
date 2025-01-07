import mongoose, { Document, Schema } from "mongoose";

// Define an interface to represent a User document
interface IUser extends Document {
  name: string;
  googleid: string;
}

// Define a user schema for the database
const UserSchema: Schema<IUser> = new Schema({
  name: { type: String, required: true },
  googleid: { type: String, required: true },
});

// Compile model from schema
const User = mongoose.model<IUser>("User", UserSchema);

export default User;
