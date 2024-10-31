import mongoose, { model, Schema } from "mongoose";
import {
  AppointmentStatus,
  IAppointment,
  PaymentStatus,
} from "../../../domain/entites/imodels/iAppontment";

const AppointmentSchema: Schema<IAppointment> = new Schema(
  {
    lawyerId: { type: Schema.Types.ObjectId, required: true, ref: "Lawyer" },
    userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    appointmentDate: { type: Date, required: true },
    appointmentTime: { type: String, required: true },
    status: {
      type: String,
      enum: Object.values(AppointmentStatus),
      default: AppointmentStatus.Pending,
    },
    consultationFee: { type: Number, required: true },
    description: { type: String, required: true },
    slotId: { type: String },
    specificSlotId: { type: String },
    videoCallLink: { type: String, default: "" },
    imageUrl: { type: String },
    convenienceFee: { type: Number },
    subTotal: { type: Number },
    paymentStatus: {
      type: String,
      enum: Object.values(PaymentStatus),
      default: PaymentStatus.Pending,
    },
    razorpayPaymentId: { type: String },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

const Appointment = mongoose.model<IAppointment>(
  "Appointment",
  AppointmentSchema
);
export default Appointment;
