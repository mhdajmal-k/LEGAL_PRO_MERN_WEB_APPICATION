import { NextFunction, Request, Response } from "express";
import IUserProfileInteractor from "../../../domain/entites/iuseCase/iUserProfile";
import { CustomError } from "../../../frameWorks/middleware/errorHandiler";

class UserProfileController {
  constructor(private userProfileInteractor: IUserProfileInteractor) {}

  async updateProfileData(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, userName, phoneNumber } = req.body;
      const id = req.params.id;

      const file = req.file ?? null;
      if (!email?.trim() || !userName?.trim()) {
        const error: CustomError = new Error(
          "Email and userName are required"
        ) as CustomError;
        error.statusCode = 400;
        throw error;
      }
      const response = await this.userProfileInteractor.updateProfile(
        { email, userName, id, phoneNumber },
        file
      );

      if (!response.status) {
        const error: CustomError = new Error(response.message) as CustomError;
        error.statusCode = 400;
        throw error;
      }

      return res.status(200).json({
        status: true,
        message: "Profile updated successfully",
        result: response.result,
      });
    } catch (error) {
      next(error);
    }
  }
  async resetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { newPassword, currentPassword } = req.body;
      const id = req.params.id;

      if (!newPassword?.trim() || !currentPassword?.trim()) {
        const error: CustomError = new Error(
          "password is required"
        ) as CustomError;
        error.statusCode = 400;
        throw error;
      }
      if (newPassword == currentPassword) {
        console.log("in here in same as");
        const error: CustomError = new Error(
          "Entered and Current password is same"
        );
        error.statusCode = 400;
        throw error;
      }
      const response = await this.userProfileInteractor.resetPassword({
        currentPassword,
        newPassword,
        id,
      });

      if (!response.status) {
        const error: CustomError = new Error(response.message) as CustomError;
        error.statusCode = 400;
        throw error;
      }

      return res.status(200).json({
        status: response.status,
        message: response.message,
        result: response.result,
      });
    } catch (error) {
      console.log("in here errorr", error);
      next(error);
    }
  }
  async AISearch(req: Request, res: Response, next: NextFunction) {
    try {
      const { prompt } = req.body;
      if (!prompt) {
        const error: CustomError = new Error("Bad Request");
        error.statusCode = 400;
        throw error;
      }
      const response = await this.userProfileInteractor.AiSearch(prompt);
      if (response.status) {
        return res.status(200).json({
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
export default UserProfileController;
