import ILawyerSlotRepository from "../../../domain/entites/irepositories/ILawyerSlotRepositories";
import Slot from "../../../frameWorks/database/models/LawyerSlotModel";
import { CustomError } from "../../../frameWorks/middleware/errorHandiler";

class LawyerSlotRepository implements ILawyerSlotRepository {
  async createNewSlot(
    id: string,
    date: Date | string,
    feeAmount: number,
    availability: { timeSlot: string; fee: number }[]
  ): Promise<any> {
    try {
      console.log(availability, "is sthe aviliabilti");
      const availabilityMapped = availability.map(({ timeSlot, fee }) => {
        return {
          timeSlot: timeSlot,
          fee: fee,
          status: false,
        };
      });

      const createSlot = new Slot({
        lawyerId: id,
        date: date,
        fees: feeAmount,
        availability: availabilityMapped,
      });
      await createSlot.save();
      return createSlot;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async findSlot(id: string): Promise<any> {
    try {
      const slots = await Slot.find({ lawyerId: id }).lean();
      if (slots) {
        return slots;
      }
    } catch (error) {
      throw new Error("filed to to get the lawyer Slots");
    }
  }
  async updateSlot(
    slotId: string,
    feeAmount: number,
    availability: { _id: string; timeSlot: string; fee: number }[]
  ): Promise<any> {
    try {
      const availabilityMapped = availability.map(({ timeSlot, fee }) => {
        return {
          timeSlot: timeSlot,
          fee: fee,
          status: false,
        };
      });

      const updateSlot = await Slot.findByIdAndUpdate(
        { _id: slotId },
        { $set: { availability: availabilityMapped, fees: Number(feeAmount) } },
        { new: true }
      );

      return updateSlot;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async deleteSlot(id: string): Promise<any> {
    try {
      const deletedSlot = await Slot.findOneAndDelete({
        _id: id,
        "availability.status": { $eq: false },
      });

      console.log(deletedSlot, "is the db deletedSlot");
      if (deletedSlot) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw new Error("Failed to delete the slot");
    }
  }
}
export default LawyerSlotRepository;
