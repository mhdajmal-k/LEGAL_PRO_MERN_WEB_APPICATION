import ILawyerSlotRepository from "../../../domain/entites/irepositories/ILawyerSlotRepositories";
import Slot from "../../../frameWorks/database/models/LawyerSlotModel";
import { CustomError } from "../../../frameWorks/middleware/errorHandiler";

class LawyerSlotRepository implements ILawyerSlotRepository {
  async createNewSlot(
    id: string,
    date: Date | string,
    feeAmount: number,
    availability: string[]
  ): Promise<any> {
    try {
      const availabilityMapped = availability.map((timeSlot) => ({
        timeSlot,
        status: false,
      }));
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
    availability: string[],
    feeAmount: number
  ): Promise<any> {
    try {
      const availabilityMapped = availability.map((timeSlot) => ({
        timeSlot,
        status: false,
      }));

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
}
export default LawyerSlotRepository;
