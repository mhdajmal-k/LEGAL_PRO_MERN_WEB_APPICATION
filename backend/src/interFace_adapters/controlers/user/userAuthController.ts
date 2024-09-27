import { Request, Response, NextFunction } from "express";
import IUserAuthInteractor from "../../../domain/entites/iuseCase/iAuth";
import IUserResult from "../../../domain/entites/imodels/IUserResult";

class UserAuthController {
  constructor(private userAuthInteractor: IUserAuthInteractor) {}

  async signUp(req: Request, res: Response): Promise<any> {
    try {
      const data = req.body;
      const response = await this.userAuthInteractor.userSingUp(data);
      if (response.status) {
        res.cookie("auth_token", response.result, {
          httpOnly: true,
          sameSite: "strict",
          maxAge: 5 * 60 * 1000,
        });

        return res.status(200).json({
          success: true,
          message: response.message,
          result: {},
        });
      } else {
        return res.status(400).json({
          success: false,
          message: response.message,
          result: {},
        });
      }
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message || "Internal Server Error",
        result: {},
      });
    }
  }

  async verifyOtp(req: Request, res: Response): Promise<any> {
    try {
      const { otp } = req.body;

      if (!otp || otp.trim() == "")
        return res
          .status(400)
          .json({ success: false, message: "otp is required", result: {} });
      const token = req.cookies.auth_token;

      if (!token)
        return res.status(400).json({
          success: false,
          message: "session is expired try again",
          result: {},
        });
      const response = await this.userAuthInteractor.verifyOtp(otp, token);

      const { status, message, result } = response;
      if (status) {
        const data = result as IUserResult;
        res.cookie("auth_accessToken", data.tokenJwt, {
          httpOnly: true,
          sameSite: "strict",
          maxAge: 5 * 60 * 1000,
        });
        res.clearCookie("auth_token");
        return res.status(200).json({
          success: true,
          message: response.message,
          result: data.user,
        });
      } else {
        res.status(400).json({
          success: false,
          message: response.message,
          result: {},
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
  async loginUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { email, password } = req.body;
      if (!email || email.trim() == "" || !password || password.trim() == "") {
        return res.status(400).json({
          success: false,
          message: "Email and password are required",
          result: {},
        });
      }
      const response = await this.userAuthInteractor.userLogin(req.body);
      console.log(response, "is she pormise");
      const { status, message, result } = response;
      if (status) {
        const data = result as IUserResult;
        res.cookie("auth_accessToken", data.tokenJwt, {
          httpOnly: true,
          sameSite: "strict",
          maxAge: 5 * 60 * 1000,
        });
        res.clearCookie("auth_token");
        res.status(200).json({
          success: true,
          message: response.message,
          result: data.user,
        });
      } else {
        res.status(400).json({
          success: false,
          message: response.message,
          result: {},
        });
      }
      return res.status;
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async resendOtp(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const token = req.cookies.auth_token;
      console.log(token, "is the token");
      if (!token) {
        return res.status(400).json({
          success: false,
          message: "Session is expired, please try again",
          result: {},
        });
      }
      const response = await this.userAuthInteractor.resendOtp(token);
      if (response.status) {
        res.clearCookie("auth_token");
        res.cookie("auth_token", response.result, {
          httpOnly: true,
          sameSite: "strict",
          maxAge: 5 * 60 * 1000,
        });
        return res.status(200).json({
          success: response.status,
          message: response.message,
          result: {},
        });
      }
    } catch (error) {
      next(error);
    }
  }
}

export default UserAuthController;
