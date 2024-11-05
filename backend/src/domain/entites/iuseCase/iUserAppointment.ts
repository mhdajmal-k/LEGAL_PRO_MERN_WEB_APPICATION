interface IUserAppointmentInteractor {
  createAppointment(
    LawyerId: string,
    slotId: string,
    fee: number,
    specificSlotId: string,
    selectedTime: string,
    selectedDate: Date,
    description: string,
    userId: string | undefined,
    file: Express.Multer.File | null
  ): Promise<{
    statusCode: number;
    status: boolean;
    message: string;
    result: string | {};
  }>;
  getAppointment(appointmentId: string): Promise<{
    statusCode: number;
    status: boolean;
    message: string;
    result: string | {};
  }>;
  createPaymentTimeout(appointmentId: string): Promise<void>;
  getAllAppointmentBasedStatus(
    status: string,
    userId: string,
    currentPage: number,
    limit: number
  ): Promise<{
    statusCode: number;
    status: boolean;
    message: string;
    result: string | {};
    totalPages?: number;
  }>;
  createPayment(appointmentId: string): Promise<{
    statusCode: number;
    status: boolean;
    message: string;
    result: string | {};
  }>;
  verifyRazorPayPayment(
    razorpay_order_id: string,
    razorpay_payment_id: string,
    razorpay_signature: string,
    appointmentId: string
  ): Promise<{
    statusCode: number;
    status: boolean;
    message: string;
    result: string | {};
  }>;
  cancellingAppointment(appointmentId: string): Promise<{
    statusCode: number;
    status: boolean;
    message: string;
    result: string | {};
  }>;
  filedPaymentAppointment(appointmentId: string): Promise<{
    statusCode: number;
    status: boolean;
    message: string;
    result: string | {};
  }>;
  getCancelledRefundStatus(appointmentId: string): Promise<{
    statusCode: number;
    status: boolean;
    message: string;
    result: string | {};
  }>;
}
export default IUserAppointmentInteractor;
