import {
  IAppointment,
  IAppointmentLawyerSide,
} from "../../../domain/entites/imodels/iAppontment";
import ILawyerAppointmentRepository from "../../../domain/entites/irepositories/ILawyerAppointmentRepositories";
import Appointment from "../../../frameWorks/database/models/appointmentModel";
import Slot from "../../../frameWorks/database/models/LawyerSlotModel";

class LawyerAppointmentRepository implements ILawyerAppointmentRepository {
  async getAllAppointmentBasedStatus(
    status: string,
    lawyerId: string,
    currentPage: number,
    limit: number
  ): Promise<IAppointmentLawyerSide[] | null | any> {
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
        lawyerId: lawyerId,
        status: status,
      })
        .populate("userId", "userName profilePicture")
        .skip((currentPage - 1) * limit)
        .limit(limit)
        .sort({ createdAt: -1 })
        .lean();
      console.log(appointments);
      return appointments;
    } catch (error) {
      throw error;
    }
  }
  // async getAppointmentById(
  //   appointmentId: string
  // ): Promise<IAppointmentLawyerSide | null> {}
  // async updateAppointmentStatus(
  //   appointmentId: string,
  //   status: string
  // ): Promise<IAppointmentLawyerSide | null> {}
  async getTotalCountOfAppointment(
    status: string,
    userId: string
  ): Promise<any | null> {
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
  async getAppointmentById(
    appointmentId: string
  ): Promise<IAppointmentLawyerSide | null> {
    try {
      const appointment = await Appointment.findById({
        _id: appointmentId,
      })
        .populate("lawyerId", "userName profile_picture city state designation")
        .lean();
      return appointment as any;
    } catch (error) {
      throw error;
    }
  }
  async cancelAppointmentById(
    appointmentId: string,
    razorpay_payment_id: string,
    status: string
  ): Promise<void> {
    try {
      const updateAppointment = await Appointment.findByIdAndUpdate(
        { _id: appointmentId },
        { $set: { status: status, razorpayPaymentId: razorpay_payment_id } },
        { new: true }
      );
      // if(!updateAppointment){

      // }
    } catch (error: any) {
      throw Error(error.message);
    }
  }
  async updateStatusSlotBySpecifSlotId(
    slotId: string,
    specificSlotId: string,
    status: boolean
  ): Promise<any> {
    try {
      console.log(status, "is the status");
      console.log(slotId, "is the slot id");
      console.log(specificSlotId, "is the specificSlotId id");

      const updateSlot = await Slot.updateOne(
        {
          _id: slotId,
          "availability.timeSlot": specificSlotId,
        },
        {
          $set: {
            "availability.$.status": status,
          },
        },
        { new: true }
      );

      console.log(updateSlot, "is the updated Slot");
      return updateSlot;
    } catch (error) {
      throw error;
    }
  }
}
export default LawyerAppointmentRepository;
