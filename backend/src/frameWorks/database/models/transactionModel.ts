import mongoose, { Schema, model } from "mongoose";
import { ITransaction } from "../../../domain/entites/imodels/ITransaction";
// Transaction schema
const transactionSchema = new Schema<ITransaction>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: ["credit", "debit"], // credit for adding funds, debit for deductions
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Transaction = model<ITransaction>("transactionSchema", transactionSchema);
export default Transaction;
