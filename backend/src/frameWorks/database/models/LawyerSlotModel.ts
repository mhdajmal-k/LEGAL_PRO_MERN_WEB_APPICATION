import mongoose, { model, Schema } from "mongoose";
import { ISlot } from "../../../domain/entites/imodels/iLawyer";

const SlotSchema: Schema<ISlot> = new Schema(
  {
    lawyerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lawyer",
      required: true,
      index: true,
    },
    date: {
      type: Date,
      required: true,
    },
    availability: [
      {
        timeSlot: { type: String, required: true },
        status: { type: Boolean, required: true, default: false },
      },
    ],
    fees: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Slot = model<ISlot>("Slot", SlotSchema);
export default Slot;
