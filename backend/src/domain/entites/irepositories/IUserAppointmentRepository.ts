import { IAppointment } from "../imodels/iAppontment";

interface IUserAppointmentRepository {
  createAppointment(
    LawyerId: string,
    slotId: string,
    fee: number,
    specificSlotId: string,
    selectedTime: string,
    selectedDate: Date,
    description: string,
    userId: string,
    convenienceFee: number,
    subTotal: number,
    image?: string
  ): Promise<any>;

  getAppointmentById(appointmentId: string): Promise<IAppointment | null>;
  getAllPendingPaymentAppointment(
    appointmentId: string
  ): Promise<IAppointment | null>;
  cancelAppointmentById(
    appointmentId: string,
    razorPayRefundId: string,
    status: string
  ): Promise<IAppointment | null>;
  updateFailedAppointmentById(
    appointmentId: string
  ): Promise<IAppointment | null>;
  getTotalCountOfAppointment(
    status: string,
    userId: string
  ): Promise<any | null>;
  getAllAppointmentBasedStatus(
    status: string,
    userId: string,
    currentPage: number,
    limit: number
  ): Promise<IAppointment[] | null>;
  updateAppointmentStatus(
    appointmentId: string,
    razorpay_payment_id: string,
    AppointmentStatus: string,
    paymentStatus: string
  ): Promise<IAppointment | null>;
  updateConsultationFee(
    appointmentId: string,
    consultationFee: number,
    convenienceFee: number,
    subTotal: number,
    newSpecifSlotId: String
  ): Promise<any>;
  getCancelledAppointmentById(appointmentId: string): Promise<any>;
}
export default IUserAppointmentRepository;
