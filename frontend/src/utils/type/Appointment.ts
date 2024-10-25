interface Lawyer {
  _id: string;
  userName: string;
  profile_picture: string;
  city: string;
  state: string;
  designation: string;
}

export interface Appointment {
  _id: string;
  lawyerId: Lawyer;
  userId: string;
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
}
