import { Document, ObjectId } from "mongoose";

export interface IReview extends Document {
  lawyerId: ObjectId;
  userId: ObjectId;
  rating?: number;
  review?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
