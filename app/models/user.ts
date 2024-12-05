import mongoose, { Document, Model } from "mongoose";

export interface IUser {
  email: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserDocument extends IUser, Document {}

const userSchema = new mongoose.Schema<IUserDocument>(
  {
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

export const User: Model<IUserDocument> = mongoose.models.User || mongoose.model<IUserDocument>("User", userSchema); 