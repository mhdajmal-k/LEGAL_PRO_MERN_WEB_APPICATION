// src/framework/database/models/userModel.ts
import mongoose, { Schema, model } from "mongoose";
import { IUser } from "../../../domain/entites/imodels/Iuser"; // Correct path for IUser

// Define the User schema
const userSchema = new Schema<IUser>(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
      unique: true,
    },
    profilePicture: {
      type: String,
    },
    block: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = model<IUser>("User", userSchema);
export default User;
