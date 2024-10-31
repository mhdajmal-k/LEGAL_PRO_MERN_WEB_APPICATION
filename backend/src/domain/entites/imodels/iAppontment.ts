import mongoose, { Document } from "mongoose";

export enum AppointmentStatus {
  Pending = "Pending",
  Confirmed = "Confirmed",
  Completed = "Completed",
  Cancelled = "Cancelled",
}
export enum PaymentStatus {
  Pending = "Pending",
  Success = "Success",
  Failed = "Failed",
}

interface BasicDetails {
  _id: string;
  userName: string;
  profile_picture: string;
  city: string;
  state: string;
  designation: string;
  years_of_experience: string;
  email?: string;
}
interface UserBasicDetails {
  _id: string;
  userName: string;
  profilePicture: string;
}

//changed in here if got any error
export interface IAppointment extends Document {
  lawyerId: BasicDetails;
  userId: mongoose.Types.ObjectId;
  appointmentDate: Date;
  appointmentTime: string;
  consultationFee: number;
  status: AppointmentStatus;
  videoCallLink: string;
  description: string;
  slotId: string;
  specificSlotId: string;
  createdAt: Date;
  updatedAt: Date;
  imageUrl: string;
  convenienceFee: number;
  subTotal: number;
  paymentStatus: PaymentStatus;
  razorpayPaymentId: string;
}
export interface IAppointmentLawyerSide extends Document {
  lawyerId: mongoose.Types.ObjectId;
  userId: UserBasicDetails;
  appointmentDate: Date;
  appointmentTime: string;
  consultationFee: number;
  status: AppointmentStatus;
  videoCallLink: string;
  description: string;
  slotId: string;
  specificSlotId: string;
  createdAt: Date;
  updatedAt: Date;
  imageUrl: string;
  convenienceFee: number;
  subTotal: number;
  paymentStatus: PaymentStatus;
  razorpayPaymentId?: string;
}
export interface IAppointmentAdminSide extends Document {
  lawyerId: BasicDetails;
  userId: UserBasicDetails;
  appointmentDate: Date;
  appointmentTime: string;
  consultationFee: number;
  status: AppointmentStatus;
  videoCallLink: string;
  description: string;
  slotId: string;
  specificSlotId: string;
  createdAt: Date;
  updatedAt: Date;
  imageUrl: string;
  convenienceFee: number;
  subTotal: number;
  paymentStatus: PaymentStatus;
}
