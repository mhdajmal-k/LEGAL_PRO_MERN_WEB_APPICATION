import { Request, Response, NextFunction } from "express";
import ILawyerAuthInteractor from "../../../domain/entites/iuseCase/iLawyerAuth";
import { validateLawyerInput } from "../../../frameWorks/utils/helpers/validationHelpers";
import {
  AuthenticatedRequest,
  ILawyer,
} from "../../../domain/entites/imodels/iLawyer";
import {
  validateProfessionalDataInput,
  validateProfileDataInput,
} from "../../../frameWorks/utils/helpers/validateProffesionalData";
import IUserResult from "../../../domain/entites/imodels/IUserResult";
import { HttpStatusCode } from "../../../frameWorks/utils/helpers/Enums";

class LawyerAuthController {
  constructor(private lawyerAuthInteractor: ILawyerAuthInteractor) {}

  /////////////////////////////////

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
          .status(HttpStatusCode.BadRequest)
          .json({ status: false, message: validateDataError, result: {} });
        return;
      }
      if (!file) {
        res.status(HttpStatusCode.BadRequest).json({
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

  /////////////////////////////

  async lawyerVerifyOtp(req: Request, res: Response): Promise<any> {
    try {
      const { otp } = req.body;

      if (!otp || otp.trim() == "")
        return res
          .status(HttpStatusCode.BadRequest)
          .json({ success: false, message: "otp is required", result: {} });
      const token = req.cookies.lawyerAuth_token;
      if (!token)
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: "session is expired try again",
          result: {},
        });
      const response = await this.lawyerAuthInteractor.verifyOtp(otp, token);

      const { statusCode, message, result } = response;
      if (result) {
        const data = result as ILawyer;
        res.clearCookie("lawyerAuth_token");

        res.cookie("Lawyer_AccessToken", data.tokenJwt, {
          httpOnly: true,
          sameSite: "strict",
          maxAge: 60 * 60 * 1000,
        });
        res.cookie("Lawyer_refreshToken", data.refreshToken, {
          httpOnly: true,
          sameSite: "strict",
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        res.status(statusCode).json({
          status: true,
          message: message,
          result: result,
        });
      } else {
        res.status(HttpStatusCode.BadRequest).json({
          status: false,
          message: response.message,
          result: {},
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  ////////////////////////////

  async resendOtp(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const token = req.cookies.lawyerAuth_token;
      if (!token) {
        return res.status(HttpStatusCode.BadRequest).json({
          status: false,
          message: "Session is expired, please try again",
          result: {},
        });
      }
      const response = await this.lawyerAuthInteractor.resendOtp(token);
      if (response.status) {
        res.clearCookie("lawyerAuth_token");
        res.cookie("lawyerAuth_token", response.result, {
          httpOnly: true,
          sameSite: "strict",
          maxAge: 60 * 60 * 1000,
        });
        return res.status(HttpStatusCode.OK).json({
          status: response.status,
          message: response.message,
          result: {},
        });
      }
    } catch (error) {
      next(error);
    }
  }

  ////////////////////

  async verifyProfessionalData(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const data = req.body;
      const id = req.user?.id;
      const files = req.files as
        | { [fieldname: string]: Express.Multer.File[] }
        | undefined;

      const validateDataError = validateProfessionalDataInput(data);
      if (validateDataError) {
        res
          .status(HttpStatusCode.BadRequest)
          .json({ status: false, message: validateDataError, result: {} });
        return;
      }
      if (!req.files) {
        res.status(HttpStatusCode.BadRequest).json({
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
      res.clearCookie("auth_lawyerAccessToken");
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

  //////////////////////

  async updateProfileData(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const data = req.body;

      const id = req.user?.id;
      const file = req.file;

      const validateDataError = validateProfileDataInput(data);
      if (validateDataError) {
        res
          .status(HttpStatusCode.BadRequest)
          .json({ status: false, message: validateDataError, result: {} });
        return;
      }
      data.practice_area = JSON.parse(data.practice_area);
      const response = await this.lawyerAuthInteractor.updateProfessionalData(
        data,
        file,
        id
      );
      res.clearCookie("auth_lawyerAccessToken");
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

  ////////////////////

  async loginLawyer(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { email, password } = req.body;
      if (!email || email.trim() == "" || !password || password.trim() == "") {
        return res.status(HttpStatusCode.BadRequest).json({
          status: false,
          message: "Email and password are required",
          result: {},
        });
      }
      const response = await this.lawyerAuthInteractor.lawyerLogin(req.body);
      const { status, message, result, statusCode } = response;
      if (response.status == true) {
        const data = result as IUserResult;
        res.cookie("Lawyer_AccessToken", data.tokenJwt, {
          httpOnly: true,
          sameSite: "strict",
          maxAge: 60 * 60 * 1000,
        });
        res.cookie("Lawyer_refreshToken", data.jwtRefreshToken, {
          httpOnly: true,
          sameSite: "strict",
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        res.clearCookie("auth_token");
        res.status(statusCode).json({
          status: status,
          message: message,
          result: data.user,
        });
      }
      return res.status;
    } catch (error) {
      console.log(error, "is the error in controller");
      next(error);
    }
  }

  ////////////////////////

  async forgotpassword(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { email } = req.body;

      if (email.trim() == "") {
        return res.status(HttpStatusCode.BadRequest).json({
          status: false,
          message: "email is Required",
          result: {},
        });
      }
      const response = await this.lawyerAuthInteractor.sendForgotPasswordLink(
        email
      );
      if (response.status) {
        res.status(response.statusCode).json({
          status: response.status,
          message: response.message,
          result: {},
        });
      }
    } catch (error) {
      next(error);
    }
  }

  //////////////////////////////

  async resetforgotpassword(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const token = req.params.token as string | undefined;
      if (!token) {
        return res.status(HttpStatusCode.Unauthorized).json({
          status: false,
          message: "Invalid token",
          result: {},
        });
      }
      const { password } = req.body;

      if (!password || password.trim() === "") {
        return res.status(HttpStatusCode.BadRequest).json({
          status: false,
          message: "Password is required",
          result: {},
        });
      }
      const response = await this.lawyerAuthInteractor.resetforgotpassword(
        password,
        token
      );
      if (response.status) {
        res.status(response.statusCode).json({
          status: response.status,
          message: response.message,
          result: {},
        });
      }
    } catch (error) {
      next(error);
    }
  }

  ////////////////////////

  async checkRefreshToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const refreshToken = req.cookies.Lawyer_refreshToken;
      if (!refreshToken) {
        return res.status(HttpStatusCode.BadRequest).json({
          status: false,
          message: "Bad Parameters - Refresh token missing.",
          result: {},
        });
      }
      const response = await this.lawyerAuthInteractor.checkRefreshToken(
        refreshToken
      );
      if (response.status) {
        res.cookie("Lawyer_AccessToken", response.result, {
          httpOnly: true,
          sameSite: "strict",
          maxAge: 15 * 60 * 1000,
        });
        return res.status(response.statusCode).json({
          status: true,
          message: "Access token refreshed successfully.",
          result: {},
        });
      } else {
        return res.status(response.statusCode).json({
          status: false,
          message: response.message,
          result: {},
        });
      }
    } catch (error) {
      next(error);
    }
  }

  ////////////////////

  async LawyerLogOut(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      res.clearCookie("Lawyer_AccessToken");
      res.clearCookie("Lawyer_refreshToken");
      res.status(HttpStatusCode.OK).json({ message: "Logout successful" });
    } catch (error) {
      next(error);
    }
  }
}

export default LawyerAuthController;
