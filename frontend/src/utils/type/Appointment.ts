interface Lawyer {
  _id: string;
  userName: string;
  profile_picture: string;
  city: string;
  state: string;
  designation: string;
  years_of_experience?: number | string;
  practice_area?: string[];
  email?: string;
}
interface User {
  _id: string;
  userName: string;
  profilePicture: string;
  email?: string;
  // city: string;
  // state: string;
  // designation: string;
}

//error may be happen here
export interface Appointment {
  _id: string;
  lawyerId: Lawyer;
  userId: User;
  appointmentDate: string;
  appointmentTime: string;
  status: string;
  consultationFee: number;
  description: string;
  slotId: string;
  specificSlotId: string;
  videoCallLink: string;
  createdAt: string;
  updatedAt: string;
  convenienceFee: number;
  subTotal: number;
  paymentStatus?: string;
  imageUrl: string;
  razorpayPaymentId?: string;
}
