import mongoose, { Schema, model } from "mongoose";
import { IUser } from "../../../domain/entites/imodels/Iuser";

const userSchema = new Schema<IUser>(
  {
    userName: {
      type: String,
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
    },
    profilePicture: {
      type: String,
    },
    block: {
      type: Boolean,
      default: false,
    },
    role: { type: String, enum: ["user", "lawyer", "admin"], default: "user" },
  },
  { timestamps: true }
);

const User = model<IUser>("User", userSchema);
export default User;
