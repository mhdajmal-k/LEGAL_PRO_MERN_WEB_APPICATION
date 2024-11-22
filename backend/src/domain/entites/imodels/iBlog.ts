import { Document, Schema } from "mongoose";
export interface IBlog extends Document {
  title: string;
  content: string;
  author: Schema.Types.ObjectId;
  category: string;
  image: string;
  createdAt: Date;
  updatedAt?: Date;
}
export interface IBlogOne extends Document {
  title: string;
  content: string;
  author: { userName: string; profile_picture: string };
  category: string;
  image: string;
  createdAt: Date;
  updatedAt?: Date;
}
