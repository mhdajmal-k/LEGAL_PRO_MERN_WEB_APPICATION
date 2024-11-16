import mongoose, { model, Schema } from "mongoose";
import { IReview } from "../../../domain/entites/imodels/iReview";

const SlotSchema: Schema<IReview> = new Schema(
  {
    lawyerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lawyer",
      required: true,
      index: true,
    },
    rating: { type: Number, min: 1, max: 5 },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    review: { type: String },
  },
  { timestamps: true }
);

const Review = model<IReview>("review", SlotSchema);
export default Review;
