import mongoose from "mongoose";
import IUserLawyerRepository from "../../../domain/entites/irepositories/IUserLawyerRepositories";
import Lawyer from "../../../frameWorks/database/models/lawyerModel";
import Slot from "../../../frameWorks/database/models/LawyerSlotModel";
import { CustomError } from "../../../frameWorks/middleware/errorHandiler";
import {
  HttpStatusCode,
  MessageError,
} from "../../../frameWorks/utils/helpers/Enums";
import { ILawyer, LawyerQuery } from "../../../domain/entites/imodels/iLawyer";
import Review from "../../../frameWorks/database/models/reviews";
import { IReview } from "../../../domain/entites/imodels/iReview";
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
      return lawyers;
    } catch (error: any) {
      throw Error(error.message);
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
      return getLawyer;
    } catch (error: any) {
      throw Error(error.message);
    }
  }
  async getLawyerSlots(id: string): Promise<any> {
    try {
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
    } catch (error: any) {
      throw Error(error.message);
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
    } catch (error: any) {
      throw Error(error.message);
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
      return updateSlot;
    } catch (error) {
      throw error;
    }
  }
  async createRating(
    lawyerId: string,
    userId: string,
    rating: number,
    review: string
  ): Promise<any> {
    try {
      const newReview = new Review({
        lawyerId,
        userId,
        rating,
        review,
      });

      await newReview.save();
      return newReview;
    } catch (error: any) {
      throw error.message;
    }
  }
  async getReview(
    lawyerId: string,
    currentPage: number,
    limit: number
  ): Promise<IReview[]> {
    try {
      const reviews = await Review.find({ lawyerId })
        .sort({ createdAt: -1 })
        .skip((currentPage - 1) * limit)
        .limit(limit)
        .populate("userId", "userName profile_picture");

      return reviews;
    } catch (error: any) {
      throw error.message;
    }
  }
  async getLawyerTopLawyers(): Promise<ILawyer[]> {
    try {
      const topReviews = await Review.aggregate([
        {
          $group: {
            _id: "$lawyerId",
            averageRating: { $avg: "$rating" },
            reviewCount: { $sum: 1 },
          },
        },
        {
          $sort: {
            averageRating: -1,
            reviewCount: -1,
          },
        },
        { $limit: 3 },
      ]);
      const lawyerIds = topReviews.map((review) => review._id);
      const topLawyers = await Lawyer.find({
        _id: { $in: lawyerIds },
        verified: "verified",
        block: false,
      })
        .select(
          "userName profile_picture practice_area years_of_experience city state courtPracticeArea designation"
        )
        .lean();
      return topLawyers;
    } catch (error: any) {
      throw error.message;
    }
  }
}
export default UserLawyerRepositories;
