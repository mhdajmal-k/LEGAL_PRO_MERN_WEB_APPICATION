import { error } from "console";

import iAdminRepository from "../../../domain/entites/irepositories/IadminRepositries";
import Lawyer from "../../../frameWorks/database/models/lawyerModel";
import User from "../../../frameWorks/database/models/userModel";
import { hashPassword } from "../../../frameWorks/utils/helpers/passwordHelper";

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
  async getUser(): Promise<any> {
    try {
      const users = await User.find({ role: { $ne: "admin" } })
        .select("-password")
        .sort({ createdAt: -1 })
        .lean();

      console.log(users, "is th eusesrs");

      return users;
    } catch (error) {
      throw new Error("Could not fetch users");
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

  async getLawyers(): Promise<any> {
    try {
      const lawyers = await Lawyer.find({ verified: "verified" })
        .select("-password")
        .sort({ createdAt: -1 })
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
}

export default AdminRepository;
