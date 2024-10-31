import { IAppointment, IAppointmentLawyerSide } from "../imodels/iAppontment";

interface ILawyerAppointmentRepository {
  getAppointmentById(
    appointmentId: string
  ): Promise<IAppointmentLawyerSide | null>;
  getTotalCountOfAppointment(
    status: string,
    lawyerId: string
  ): Promise<any | null>;
  getAllAppointmentBasedStatus(
    status: string,
    lawyerId: string,
    currentPage: number,
    limit: number
  ): Promise<IAppointmentLawyerSide[] | null>;
  cancelAppointmentById(
    appointmentId: string,
    razorPayRefundId: string,
    status: string
  ): Promise<void>;
  updateStatusSlotBySpecifSlotId(
    slotId: string,
    specificSlotId: string,
    status: boolean
  ): Promise<any>;
}
export default ILawyerAppointmentRepository;
