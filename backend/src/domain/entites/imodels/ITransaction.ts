import mongoose, { Document } from "mongoose";

export interface ITransaction extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  amount: number;
  type: "credit" | "debit";
  description: string;
  timestamp?: Date;
}
