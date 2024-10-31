import { error } from "console";

import iAdminRepository from "../../../domain/entites/irepositories/IadminRepositries";
import Lawyer from "../../../frameWorks/database/models/lawyerModel";
import User from "../../../frameWorks/database/models/userModel";
import { hashPassword } from "../../../frameWorks/utils/helpers/passwordHelper";
import Appointment from "../../../frameWorks/database/models/appointmentModel";
import { IAppointmentAdminSide } from "../../../domain/entites/imodels/iAppontment";

class AdminRepository implements iAdminRepository {
  async adminAlreadyExist(email: string, role: string): Promise<any> {
    const lawyer = await User.findOne({ email: email, role: role }).lean();
    return lawyer;
  }
  async createAdmin(data: any, role: string): Promise<any> {
    const hashedPassword = hashPassword(data.password);
    try {
      const newUser = new User({
        email: data.email,
        password: hashedPassword,
        role: role,
      });
      try {
        await newUser.save();
        console.log(newUser, "is hte new user");
        return newUser;
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async getUser(currentPage: number, limit: number): Promise<any> {
    try {
      const users = await User.find({ role: { $ne: "admin" } })
        .select("-password")
        .sort({ createdAt: -1 })
        .skip((currentPage - 1) * limit)
        .limit(limit)
        .sort({ createdAt: -1 })
        .lean();

      return users;
    } catch (error) {
      throw new Error("Could not fetch users");
    }
  }
  async getTotalCount(db: string): Promise<any> {
    try {
      let total;
      if (db == "user") {
        total = await User.countDocuments({
          role: { $ne: "admin" },
        });
      } else if (db == "lawyer") {
        total = await Lawyer.countDocuments({
          verified: "verified",
        });
      }
      return total;
    } catch (error) {
      throw new Error("field to get total counts");
    }
  }
  async getPendingApprovalLawyers(): Promise<any> {
    try {
      const lawyers = await Lawyer.find({ verified: "not_verified" })
        .select("-password")
        .sort({ createdAt: -1 })
        .lean();
      return lawyers;
    } catch (error) {
      throw error;
    }
  }

  async getLawyers(currentPage: number, limit: number): Promise<any> {
    try {
      const lawyers = await Lawyer.find({ verified: "verified" })
        .select("-password")
        .sort({ createdAt: -1 })
        .skip((currentPage - 1) * limit)
        .sort({ createdAt: -1 })
        .limit(limit)
        .lean();
      console.log(lawyers, "in thee db ");
      return lawyers;
    } catch (error) {
      throw error;
    }
  }

  async getLawyer(id: string): Promise<any> {
    try {
      const lawyer = await Lawyer.findById({ _id: id });
      console.log(lawyer, "is the lawyer");

      return lawyer;
    } catch (error) {
      throw error;
    }
  }
  async getAdmin(id: string): Promise<any> {
    try {
      const lawyer = await User.findById({ _id: id });

      return lawyer;
    } catch (error) {
      throw error;
    }
  }
  async verifyLawyer(id: string): Promise<any> {
    try {
      const updatedLawyer = await Lawyer.findByIdAndUpdate(
        id,
        { verified: "verified" },
        { new: true }
      );
      return updatedLawyer;
    } catch (error) {
      throw error;
    }
  }
  async unverifyLawyer(id: string): Promise<any> {
    try {
      const updatedLawyer = await Lawyer.findByIdAndUpdate(
        id,
        { verified: "rejected" },
        { new: true }
      );
      console.log(updatedLawyer);
      return updatedLawyer;
    } catch (error) {
      throw error;
    }
  }
  async blockorUnblock(
    id: string,
    blockState: boolean,
    action: string
  ): Promise<any> {
    try {
      let updated;
      if (action == "user") {
        updated = await User.findByIdAndUpdate(
          id,
          { block: blockState },
          { new: true }
        );
      } else if (action == "lawyer") {
        updated = await Lawyer.findByIdAndUpdate(
          id,
          { block: blockState },
          { new: true }
        );
      } else {
        throw error("failed to block and unblock");
      }

      if (updated) return updated;

      // async blockorUnblock(id: string, blockState: boolean): Promise<any> {
      //   try {
      //     const updateUser = await User.findByIdAndUpdate(
      //       id,
      //       { block: blockState },
      //       { new: true }
      //     );
      //     if (updateUser) return updateUser;
    } catch (error) {
      throw error;
    }
  }
  async getAllAppointmentBasedStatusInAdmin(
    status: string,
    currentPage: number,
    limit: number
  ): Promise<IAppointmentAdminSide[] | null> {
    try {
      // let filter = {};
      // if (status === "Pending") {
      //   filter = { date: { $gte: new Date() }, status: "Pending" };
      // } else if (status === "Completed") {
      //   filter = { date: { $lt: new Date() }, status: "Completed" };
      // } else if (status === "canceled") {
      //   filter = { status: "Cancelled" };
      // }
      const appointments = await Appointment.find({ status: status })
        .populate("userId", "userName profilePicture")
        .populate("lawyerId", "userName profile_picture city state designation")
        .skip((currentPage - 1) * limit)
        .limit(limit)
        .sort({ createdAt: -1 })
        .lean<IAppointmentAdminSide[]>();
      console.log(appointments);
      return appointments;
    } catch (error) {
      throw error;
    }
  }
  async getTotalCountOfAppointment(status: string): Promise<any | null> {
    try {
      let filter = {};
      if (status === "Pending") {
        filter = { date: { $gte: new Date() }, status: "Pending" };
      } else if (status === "completed") {
        filter = { date: { $lt: new Date() }, status: "Completed" };
      } else if (status === "canceled") {
        filter = { status: "Cancelled" };
      }
      console.log(status, "is total couont");
      const appointmentsTotal = await Appointment.countDocuments({ status });
      console.log(appointmentsTotal, "iksssdfsdfdfsdf");
      return appointmentsTotal;
    } catch (error) {
      throw new Error("field to get total counts");
    }
  }
  async getAppointmentById(
    appointmentId: string
  ): Promise<IAppointmentAdminSide | null> {
    try {
      const appointment = await Appointment.findById({
        _id: appointmentId,
      })
        .populate("userId", "userName profilePicture email")
        .populate(
          "lawyerId",
          "userName profile_picture city state designation years_of_experience practice_area"
        )
        .lean();
      return appointment as any;
    } catch (error) {
      throw error;
    }
  }
}

export default AdminRepository;
