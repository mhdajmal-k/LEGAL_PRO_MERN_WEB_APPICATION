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
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async updateAppointmentStatus(
    appointmentId: string,
    status: string
  ): Promise<IAppointment | null> {
    try {
      const updateAppointment = await Appointment.findByIdAndUpdate(
        { _id: appointmentId },
        { $set: { paymentStatus: status } },
        { new: true }
      );
      return updateAppointment;
    } catch (error) {
      throw error;
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
      if (status === "Pending") {
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
        .lean();

      return appointments;
    } catch (error) {
      throw error;
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
}
export default UserAppointmentRepositories;
