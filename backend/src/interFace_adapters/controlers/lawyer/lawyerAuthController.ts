import { Request, Response, NextFunction } from "express";
import ILawyerAuthInteractor from "../../../domain/entites/iuseCase/iLawyerAuth";
import { validateLawyerInput } from "../../../frameWorks/utils/helpers/validationHelpers";
import { ILawyer } from "../../../domain/entites/imodels/iLawyer";
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

      res.status(200).json({
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
        res.cookie("auth_lawyerAccessToken", data.token, {
          httpOnly: true,
          sameSite: "strict",
          maxAge: 5 * 60 * 1000,
        });
        res.clearCookie("lawyerAuth_token");
        return res.status(statusCode).json({
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
}

export default LawyerAuthController;
