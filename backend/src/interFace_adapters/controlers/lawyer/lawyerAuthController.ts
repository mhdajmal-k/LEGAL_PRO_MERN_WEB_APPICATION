import { Request, Response, NextFunction } from "express";
import ILawyerAuthInteractor from "../../../domain/entites/iuseCase/iLawyerAuth";
import { validateLawyerInput } from "../../../frameWorks/utils/helpers/validationHelpers";
import {
  AuthenticatedRequest,
  ILawyer,
} from "../../../domain/entites/imodels/iLawyer";
import { validateProfessionalDataInput } from "../../../frameWorks/utils/helpers/validateProffesionalData";
class LawyerAuthController {
  constructor(private lawyerAuthInteractor: ILawyerAuthInteractor) {}
  async lawyerSignUp(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const data = req.body;
      const file = req.file;

      const validateDataError = validateLawyerInput(data);
      if (validateDataError) {
        res
          .status(400)
          .json({ status: false, message: validateDataError, result: {} });
        return;
      }
      if (!file) {
        res.status(400).json({
          status: false,
          message: "profile image is required",
          result: {},
        });
        return;
      }

      const response = await this.lawyerAuthInteractor.lawyerSingUp(data, file);

      res.cookie("lawyerAuth_token", response.result, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 5 * 60 * 1000,
      });

      res.status(response.statusCode).json({
        status: true,
        message: response.message,
        result: {},
      });
    } catch (error) {
      next(error);
    }
  }
  async lawyerVerifyOtp(req: Request, res: Response): Promise<any> {
    try {
      const { otp } = req.body;

      if (!otp || otp.trim() == "")
        return res
          .status(400)
          .json({ success: false, message: "otp is required", result: {} });
      const token = req.cookies.lawyerAuth_token;
      console.log(token);
      if (!token)
        return res.status(400).json({
          success: false,
          message: "session is expired try again",
          result: {},
        });
      const response = await this.lawyerAuthInteractor.verifyOtp(otp, token);

      const { statusCode, message, result } = response;
      if (result) {
        const data = result as ILawyer;
        res.clearCookie("lawyerAuth_token");

        res.cookie("auth_lawyerAccessToken", data.tokenJwt, {
          httpOnly: true,
          sameSite: "strict",
          maxAge: 60 * 60 * 1000,
        });
        res.status(statusCode).json({
          status: true,
          message: message,
          result: result,
        });
      } else {
        res.status(400).json({
          status: false,
          message: response.message,
          result: {},
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async verifyProfessionalData(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      console.log("hifdfdd");
      const data = req.body;
      const id = req.user?.id;
      const files = req.files as
        | { [fieldname: string]: Express.Multer.File[] }
        | undefined;

      const validateDataError = validateProfessionalDataInput(data);
      if (validateDataError) {
        res
          .status(400)
          .json({ status: false, message: validateDataError, result: {} });
        return;
      }
      if (!req.files) {
        res.status(400).json({
          status: false,
          message: "certificate is required image is required",
          result: {},
        });
        return;
      }
      const response = await this.lawyerAuthInteractor.verifyProfessionalData(
        data,
        files,
        id
      );
      console.log("success");
      res.status(response.statusCode).json({
        status: true,
        message: response.message,
        result: {},
      });
    } catch (error) {
      console.log(error, "is the error ");
      next(error);
    }
  }
}

export default LawyerAuthController;
