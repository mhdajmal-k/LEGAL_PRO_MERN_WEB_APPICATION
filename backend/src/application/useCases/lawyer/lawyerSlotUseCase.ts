import { error } from "console";
import ILawyerSlotInteractor from "../../../domain/entites/iuseCase/ILawyerSlot";
import { CustomError } from "../../../frameWorks/middleware/errorHandiler";
import ILawyerSlotRepository from "../../../domain/entites/irepositories/ILawyerSlotRepositories";
import { ISlot } from "../../../domain/entites/imodels/iLawyer";

class LawyerSlotInteractor implements ILawyerSlotInteractor {
  constructor(private Repository: ILawyerSlotRepository) {}
  async createSlot(
    id: string,
    date: Date | string,
    feeAmount: number,
    availabilityTime: string[]
  ): Promise<{
    statusCode: number;
    status: boolean;
    message: string;
    result: string | {};
  }> {
    try {
      const createSlot = await this.Repository.createNewSlot(
        id,
        date,
        feeAmount,
        availabilityTime
      );
      console.log(createSlot, "is the create Slot");
      return {
        statusCode: 200,
        status: true,
        message: "slot Created SuccessFully",
        result: createSlot,
      };
    } catch (error) {
      throw error;
    }
  }
  async getLawyerSlot(id: string): Promise<{
    statusCode: number;
    status: boolean;
    message: string;
    result: ISlot | {};
  }> {
    try {
      const slots = await this.Repository.findSlot(id);
      if (!slots) {
        const error: CustomError = new Error("Filed to get Slots");
        throw error;
      }
      return {
        statusCode: 200,
        status: true,
        message: "slot Fetched SuccessFully",
        result: slots,
      };
    } catch (error) {
      throw error;
    }
  }
  async updateSlot(
    slotId: string,
    feeAmount: number,
    availability: string[]
  ): Promise<{
    statusCode: number;
    status: boolean;
    message: string;
    result: string | {};
  }> {
    try {
      const updatedSlot = await this.Repository.updateSlot(
        slotId,
        availability,
        feeAmount
      );
      return {
        statusCode: 200,
        status: true,
        message: "slot updated SuccessFully",
        result: updatedSlot,
      };
    } catch (error) {
      throw error;
    }
  }
}
export default LawyerSlotInteractor;
