// src/domain/models/IUser.ts
import { Document } from "mongoose";

export interface IUser extends Document {
  userName: string;
  email: string;
  phoneNumber?: number;
  password: string;
  profilePicture?: string;
  block?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  role?: string;
}
