import { NextFunction, Request, Response } from "express";
import { CustomError } from "../../../frameWorks/middleware/errorHandiler";
import IUsersLawyerInteractor from "../../../domain/entites/iuseCase/IUserLawyerList";

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

      const response = await this.UserLawyerInteractor.getVerifiedLawyers();
      console.log(response);
      return res.status(200).json({
        status: response.status,
        message: response.message,
        result: response.result,
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
      console.log(
        "fuck fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
      );
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
}
export default UserLawyerController;
