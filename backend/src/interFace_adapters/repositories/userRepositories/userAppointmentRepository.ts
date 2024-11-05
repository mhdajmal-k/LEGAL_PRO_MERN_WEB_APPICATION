import { IAppointment } from "../../../domain/entites/imodels/iAppontment";
import IUserAppointmentRepository from "../../../domain/entites/irepositories/IUserAppointmentRepository";
import Appointment from "../../../frameWorks/database/models/appointmentModel";
class UserAppointmentRepositories implements IUserAppointmentRepository {
  async createAppointment(
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
    image: string
  ): Promise<any> {
    try {
      console.log(
        image,
        "is iam looking 222222222222222222222222222222222222222222"
      );
      const createAppointment = new Appointment({
        lawyerId: LawyerId,
        userId: userId,
        appointmentDate: selectedDate,
        appointmentTime: selectedTime,
        consultationFee: fee,
        slotId: slotId,
        description: description,
        specificSlotId: specificSlotId,
        imageUrl: image,
        subTotal: subTotal,
        convenienceFee,
      });
      await createAppointment.save();
      return createAppointment;
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  }
  async getAppointmentById(
    appointmentId: string
  ): Promise<IAppointment | null> {
    try {
      const appointment = await Appointment.findById({
        _id: appointmentId,
      })
        .populate("lawyerId", "userName profile_picture city state designation")
        .lean();
      return appointment;
    } catch (error) {
      throw error;
    }
  }
  async updateConsultationFee(
    appointmentId: string,
    consultationFee: number,
    convenienceFee: number,
    subTotal: number
  ): Promise<any> {
    console.log(subTotal, "in the repo");
    try {
      const updatedAppointment = await Appointment.findByIdAndUpdate(
        { _id: appointmentId },
        {
          $set: {
            consultationFee: consultationFee,
            convenienceFee: convenienceFee,
            subTotal: subTotal,
          },
        },
        { new: true }
      );

      return updatedAppointment;
    } catch (error: any) {
      console.error(error);
      throw Error(error.message);
    }
  }
  async updateAppointmentStatus(
    appointmentId: string,
    razorpay_payment_id: string,
    AppointmentStatus: string,
    paymentStatus: string
  ): Promise<IAppointment | null> {
    try {
      const updateAppointment = await Appointment.findByIdAndUpdate(
        { _id: appointmentId },
        {
          $set: {
            status: AppointmentStatus,
            paymentStatus: paymentStatus,
            razorpayPaymentId: razorpay_payment_id,
          },
        },
        { new: true }
      );
      return updateAppointment;
    } catch (error: any) {
      throw Error(error.message);
    }
  }
  async getAllPendingPaymentAppointment(
    appointmentId: string
  ): Promise<IAppointment | null> {
    try {
      const AllAppointments = await Appointment.findOne({
        _id: appointmentId,
        status: "Pending",
        paymentStatus: "Pending",
      });
      return AllAppointments;
    } catch (error: any) {
      throw Error(error.message);
    }
  }
  async getAllAppointmentBasedStatus(
    status: string,
    userId: string,
    currentPage: number,
    limit: number
  ): Promise<IAppointment[] | null> {
    try {
      let filter = {};
      if (status === "Confirmed") {
        filter = { date: { $gte: new Date() }, status: "Pending" };
      } else if (status === "Completed") {
        filter = { date: { $lt: new Date() }, status: "Completed" };
      } else if (status === "canceled") {
        filter = { status: "Cancelled" };
      }
      const appointments = await Appointment.find({
        userId: userId,
        status: status,
      })
        .populate(
          "lawyerId",
          "userName profile_picture city state designation years_of_experience"
        )
        .skip((currentPage - 1) * limit)
        .limit(limit)
        .sort({ createdAt: -1 })
        .lean();

      return appointments;
    } catch (error: any) {
      throw Error(error.message);
    }
  }
  async getTotalCountOfAppointment(
    status: string,
    userId: string
  ): Promise<any> {
    try {
      let filter = {};
      if (status === "Pending") {
        filter = { date: { $gte: new Date() }, status: "Pending" };
      } else if (status === "completed") {
        filter = { date: { $lt: new Date() }, status: "Completed" };
      } else if (status === "canceled") {
        filter = { status: "Cancelled" };
      }
      const appointmentsTotal = await Appointment.countDocuments({
        userId: userId,
        status: status,
      });
      return appointmentsTotal;
    } catch (error) {
      throw new Error("field to get total counts");
    }
  }
  async cancelAppointmentById(
    appointmentId: string,
    razorpay_payment_id: string,
    status: string
  ): Promise<IAppointment | null> {
    try {
      const updateAppointment = await Appointment.findByIdAndUpdate(
        { _id: appointmentId },
        { $set: { status: status, razorpayPaymentId: razorpay_payment_id } },
        { new: true }
      );
      return updateAppointment;
    } catch (error: any) {
      throw Error(error.message);
    }
  }
  async getCancelledAppointmentById(appointmentId: string): Promise<any> {
    try {
      const cancelledAppointment = await Appointment.findOne({
        _id: appointmentId,
        status: "Cancelled",
      });
      console.log(cancelledAppointment, "in the repo");
      return cancelledAppointment;
    } catch (error: any) {
      throw Error(error.message);
    }
  }
  async updateFailedAppointmentById(appointmentId: string): Promise<any> {
    try {
      console.log(appointmentId, "in the fi.de");
      const cancelledAppointment = await Appointment.findByIdAndUpdate(
        { _id: appointmentId },
        { $set: { status: "Cancelled", paymentStatus: "Failed" } }
      );
      console.log(cancelledAppointment, "in the repo failed");
      return cancelledAppointment;
    } catch (error: any) {
      console.log(error, "in repo of filaed payment");
      throw Error(error.message);
    }
  }
}
export default UserAppointmentRepositories;
