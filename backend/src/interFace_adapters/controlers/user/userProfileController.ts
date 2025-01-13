import { NextFunction, Request, Response } from "express";
import IUserProfileInteractor from "../../../domain/entites/iuseCase/iUserProfile";
import { CustomError } from "../../../frameWorks/middleware/errorHandiler";
import { HttpStatusCode } from "../../../frameWorks/utils/helpers/Enums";
import { AuthenticatedRequest } from "../../../domain/entites/imodels/iLawyer";

class UserProfileController {
  constructor(private userProfileInteractor: IUserProfileInteractor) {}

  ////////////////////

  async updateProfileData(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      console.log(req.body);
      const { userName, phoneNumber } = req.body;
      const id = req.user?.id;
      if (!id) throw Error("id is required");
      const file = req.file ?? null;

      const response = await this.userProfileInteractor.updateProfile(
        { userName, id, phoneNumber },
        file
      );

      if (!response.status) {
        const error: CustomError = new Error(response.message) as CustomError;
        error.statusCode = HttpStatusCode.BadRequest;
        throw error;
      }
      return res.status(HttpStatusCode.OK).json({
        status: true,
        message: "Profile updated successfully",
        result: response.result,
      });
    } catch (error) {
      next(error);
    }
  }
  async getProfile(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId = req.user?.id;

      const response = await this.userProfileInteractor.getProfileData(
        String(userId)
      );

      if (!response.status) {
        const error: CustomError = new Error(response.message) as CustomError;
        error.statusCode = HttpStatusCode.BadRequest;
        throw error;
      }

      return res.status(HttpStatusCode.OK).json({
        status: true,
        message: "Profile fetched successfully",
        result: response.result,
      });
    } catch (error) {
      next(error);
    }
  }

  ///////////////////////

  async resetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { newPassword, currentPassword } = req.body;
      const id = req.params.id;

      if (!newPassword?.trim() || !currentPassword?.trim()) {
        const error: CustomError = new Error(
          "password is required"
        ) as CustomError;
        error.statusCode = HttpStatusCode.BadRequest;
        throw error;
      }
      if (newPassword == currentPassword) {
        console.log("in here in same as");
        const error: CustomError = new Error(
          "Entered and Current password is same"
        );
        error.statusCode = HttpStatusCode.BadRequest;
        throw error;
      }
      const response = await this.userProfileInteractor.resetPassword({
        currentPassword,
        newPassword,
        id,
      });

      if (!response.status) {
        const error: CustomError = new Error(response.message) as CustomError;
        error.statusCode = HttpStatusCode.BadRequest;
        throw error;
      }

      return res.status(HttpStatusCode.OK).json({
        status: response.status,
        message: response.message,
        result: response.result,
      });
    } catch (error) {
      next(error);
    }
  }

  ///////////////

  async AISearch(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      console.log("this is the ai serch");
      const { prompt } = req.body;
      console.log(prompt, "is the prompt");
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
      next(error);
    }
  }

  async walletDetails(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const id = req.user?.id;
      const response = await this.userProfileInteractor.walletDetails(id);
      if (response.status) {
        return res.status(200).json({
          status: response.status,
          message: response.message,
          result: response.result,
        });
      }
    } catch (error) {
      next(error);
    }
  }
}
export default UserProfileController;
