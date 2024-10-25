import { NextFunction, Request, Response } from "express";
import { CustomError } from "../../../frameWorks/middleware/errorHandiler";
import IUsersLawyerInteractor from "../../../domain/entites/iuseCase/IUserLawyerList";
import mongoose from "mongoose";

class UserLawyerController {
  constructor(private UserLawyerInteractor: IUsersLawyerInteractor) {}

  async getVerifiedLawyers(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      // const { location, practiceArea, experience, language, rating, page = 1, limit = 10 } = req.query;
      // let query={}
      const currentPage = req.query.page ? req.query.page : 1;
      const limit = req.query.limit ? req.query.limit : 5;
      console.log(currentPage, "is the current page");
      console.log(limit, "is the current page");
      const response = await this.UserLawyerInteractor.getVerifiedLawyers(
        Number(currentPage),
        Number(limit)
      );

      const lawyers = response.result;
      const totalPages = response.totalPages;
      return res.status(200).json({
        status: response.status,
        message: response.message,
        result: { lawyers, totalPages },
      });
    } catch (error) {
      next(error);
    }
  }
  async getLawyerById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      let { id } = req.params;
      if (!id) {
        return res.status(400).json({
          status: false,
          message: "invalid Id",
        });
      }
      const response = await this.UserLawyerInteractor.getLawyerById(id);
      console.log(response);
      if (response.status) {
        return res.status(response.statusCode).json({
          status: response.status,
          message: "Lawyer got successFully",
          result: response.result,
        });
      }
    } catch (error) {
      next(error);
    }
  }
  async lawyerSlot(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      let { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          status: false,
          message: "invalid Lawyer Id ",
          result: {},
        });
      }
      const response = await this.UserLawyerInteractor.getLawyerslot(id);
      console.log(response);
      if (response.status) {
        return res.status(response.statusCode).json({
          status: response.status,
          message: "Lawyer got successFully",
          result: response.result,
        });
      }
    } catch (error) {
      next(error);
    }
  }
}
export default UserLawyerController;
