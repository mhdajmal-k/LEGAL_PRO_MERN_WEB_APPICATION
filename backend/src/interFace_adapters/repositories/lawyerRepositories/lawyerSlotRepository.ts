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
      const existingSlot = await Slot.findById(slotId);
      if (!existingSlot) {
        throw new Error("Slot not found");
      }

      const existingStatusMap = new Map(
        existingSlot.availability.map((slot) => [slot.timeSlot, slot.status])
      );
      const updatedAvailability = availability.map(({ timeSlot, fee }) => ({
        timeSlot,
        fee,
        status: existingStatusMap.get(timeSlot) || false,
      }));

      const updatedSlot = await Slot.findByIdAndUpdate(
        slotId,
        {
          $set: {
            availability: updatedAvailability,
            fees: Number(feeAmount),
          },
        },
        { new: true }
      );

      if (!updatedSlot) {
        throw new Error("Failed to update slot");
      }

      return updatedSlot;
    } catch (error) {
      console.error("Error updating slot:", error);
      throw error;
    }
  }

  async deleteSlot(id: string): Promise<any> {
    try {
      const updateSlot = await Slot.findByIdAndUpdate(
        { _id: id },
        { $pull: { availability: { status: false } } },
        { new: true }
      );
      if (updateSlot) {
        return updateSlot; // Return the updated slot if successful
      } else {
        return null; // Return null if no slot was found
      }
    } catch (error) {
      throw new Error("Failed to delete the slot");
    }
  }
}
export default LawyerSlotRepository;
