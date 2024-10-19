import { Request, Response, NextFunction } from "express";
import ILawyerSlotInteractor from "../../../domain/entites/iuseCase/ILawyerSlot";
import mongoose from "mongoose";

class LawyerSlotController {
  constructor(private lawyerSlotInteractor: ILawyerSlotInteractor) {}
  async CreateSlotController(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { id, date, time, feeAmount } = req.body;
      if (!id || !date || !time || feeAmount == null) {
        return res.status(400).json({
          status: false,
          message: "Missing Required Data",
          result: {},
        });
      }
      console.log(time, "is the time");
      const response = await this.lawyerSlotInteractor.createSlot(
        id,
        date,
        feeAmount,
        time
      );
      console.log(response, "is the response");
      if (response.status) {
        res.status(response.statusCode).json({
          status: response.status,
          message: response.message,
          result: {},
        });
      }
    } catch (error) {
      next();
    }
  }
  async fetchLawyerSlots(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { id } = req.params;
      console.log("in the fetch");
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          status: false,
          message: "Lawyer Id is Required",
          result: {},
        });
      }

      const response = await this.lawyerSlotInteractor.getLawyerSlot(id);
      console.log(response, "is the response");
      if (response.status) {
        res.status(response.statusCode).json({
          status: response.status,
          message: response.message,
          result: response.result,
        });
      }
    } catch (error) {
      next();
    }
  }
  async updateSlots(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { slotId } = req.params;
      const { time, feeAmount } = req.body;
      if (!mongoose.Types.ObjectId.isValid(slotId)) {
        return res.status(400).json({
          status: false,
          message: "slotId Id is Required",
          result: {},
        });
      }

      const response = await this.lawyerSlotInteractor.updateSlot(
        slotId,
        feeAmount,
        time
      );

      if (response.status) {
        res.status(response.statusCode).json({
          status: response.status,
          message: response.message,
          result: response.result,
        });
      }
    } catch (error) {
      next();
    }
  }
}
export default LawyerSlotController;
