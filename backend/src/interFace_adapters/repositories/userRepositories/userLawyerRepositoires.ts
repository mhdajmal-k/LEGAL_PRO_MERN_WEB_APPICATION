import mongoose from "mongoose";
import IUserLawyerRepository from "../../../domain/entites/irepositories/IUserLawyerRepositories";
import Lawyer from "../../../frameWorks/database/models/lawyerModel";
import Slot from "../../../frameWorks/database/models/LawyerSlotModel";
import { CustomError } from "../../../frameWorks/middleware/errorHandiler";
import {
  HttpStatusCode,
  MessageError,
} from "../../../frameWorks/utils/helpers/Enums";
import { LawyerQuery } from "../../../domain/entites/imodels/iLawyer";
class UserLawyerRepositories implements IUserLawyerRepository {
  async getVerifiedLawyers(
    currentPage: number,
    limit: number,
    query: LawyerQuery
  ): Promise<any> {
    try {
      const lawyers = await Lawyer.find(query)
        .select("-password")
        .sort({ createdAt: -1 })
        .skip((currentPage - 1) * limit)
        .limit(limit)
        .lean();
      console.log(lawyers, "is the repo");
      return lawyers;
    } catch (error) {
      throw error;
    }
  }
  async getTotalCountOfLawyers(db: string, query: LawyerQuery): Promise<any> {
    try {
      let total;
      if (db == "lawyer") {
        total = await Lawyer.countDocuments(query);
      }
      return total;
    } catch (error) {
      throw new Error("field to get total counts");
    }
  }
  async getLawyerById(id: string): Promise<any> {
    try {
      const getLawyer = await Lawyer.findById({ _id: id })
        .select("-password")
        .lean();
      if (!getLawyer) {
        const error: CustomError = new Error("lawyer not found");
        error.statusCode = 400;
        throw error;
      }
      console.log(getLawyer, "is htttttttttttttttttttttttttttttttttttt");
      return getLawyer;
    } catch (error) {
      throw error;
    }
  }
  async getLawyerSlots(id: string): Promise<any> {
    try {
      console.log(id, "is the lawyerId");
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const getSlots = await Slot.find({
        lawyerId: id,
        date: { $gte: today },
      }).populate(
        "lawyerId",
        "userName profile_picture city state designation years_of_experience"
      );
      if (!getSlots) {
        const error: CustomError = new Error("lawyer not found");
        error.statusCode = 400;
        throw error;
      }

      return getSlots;
    } catch (error) {
      throw error;
    }
  }
  async getSlotBySlotId(slotId: string): Promise<any> {
    try {
      const slot = await Slot.findById(slotId).lean();
      if (!slot) {
        const error: CustomError = new Error(MessageError.SlotNotFound);
        error.statusCode = HttpStatusCode.Forbidden;
        throw error;
      }
      return slot;
    } catch (error) {
      throw error;
    }
  }
  async getSlotBySpecifSlotId(
    slotId: string,
    specificSlotId: string
  ): Promise<any> {
    try {
      console.log(specificSlotId, "is the specificSlotId in repo");

      const specificTimeSlot = await Slot.findOne(
        {
          _id: slotId,
          availability: { $elemMatch: { timeSlot: specificSlotId } },
        },
        { "availability.$": 1 }
      );
      return specificTimeSlot;
    } catch (error) {
      console.log(error);
      throw error;
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
export default UserLawyerRepositories;
