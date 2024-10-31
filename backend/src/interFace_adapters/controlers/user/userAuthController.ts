import { Request, Response, NextFunction } from "express";
import IUserAuthInteractor from "../../../domain/entites/iuseCase/iAuth";
import IUserResult from "../../../domain/entites/imodels/IUserResult";
import {
  HttpStatusCode,
  MessageError,
} from "../../../frameWorks/utils/helpers/Enums";

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
          status: response.status,
          message: response.message,
          result: {},
        });
      } else {
        return res.status(400).json({
          status: response.status,
          message: response.message,
          result: {},
        });
      }
    } catch (error: any) {
      return res.status(500).json({
        status: false,
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
          .json({ status: false, message: "otp is required", result: {} });
      const token = req.cookies.auth_token;

      if (!token)
        return res.status(400).json({
          status: false,
          message: "session is expired try again",
          result: {},
        });
      const response = await this.userAuthInteractor.verifyOtp(otp, token);

      const { status, message, result } = response;
      if (status) {
        const data = result as IUserResult;
        // auth_accessToken

        res.cookie("User_accessToken", data.tokenJwt, {
          httpOnly: true,
          sameSite: "strict",
          maxAge: 20 * 60 * 1000,
        });
        res.clearCookie("auth_token");
        return res.status(200).json({
          status: status,
          message: response.message,
          result: data.user,
        });
      } else {
        res.status(400).json({
          success: status,
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
          status: false,
          message: "Email and password are required",
          result: {},
        });
      }
      const response = await this.userAuthInteractor.userLogin(req.body);

      const { status, message, result } = response;
      if (status) {
        const data = result as IUserResult;
        res.cookie("User_accessToken", data.tokenJwt, {
          httpOnly: true,
          sameSite: "strict",
          maxAge: 60 * 60 * 1000,
        });
        res.cookie("User_refreshToken", data.jwtRefreshToken, {
          httpOnly: true,
          sameSite: "strict",
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.clearCookie("auth_token");
        res.status(200).json({
          status: status,
          message: response.message,
          result: data.user,
        });
      } else {
        res.status(400).json({
          status: status,
          message: response.message,
          result: {},
        });
      }
      return res.status;
    } catch (error) {
      console.log(error, "in here rate limit");
      next(error);
    }
  }
  async googleSignUp(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      console.log(req.body);
      const { email, userName } = req.body;
      if (!email || email.trim() == "" || !userName || userName.trim() == "") {
        return res.status(400).json({
          status: false,
          message: "Error accrued need to Login",
          result: {},
        });
      }
      const response = await this.userAuthInteractor.googleSignUP(req.body);

      const { status, message, result } = response;
      if (status) {
        const data = result as IUserResult;
        res.cookie("User_accessToken", data.tokenJwt, {
          httpOnly: true,
          sameSite: "strict",
          maxAge: 15 * 60 * 1000,
        });
        res.clearCookie("auth_token");
        res.status(200).json({
          status: status,
          message: response.message,
          result: data.user,
        });
      } else {
        res.status(400).json({
          status: status,
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
          status: false,
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
          status: response.status,
          message: response.message,
          result: {},
        });
      }
    } catch (error) {
      next(error);
    }
  }

  async forgotpassword(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      console.log("hi in forgot");
      const { email } = req.body;
      console.log(email);
      if (email.trim() == "") {
        return res.status(400).json({
          status: false,
          message: "email is Required",
          result: {},
        });
      }
      const response = await this.userAuthInteractor.sendForgotPasswordLink(
        email
      );
      if (response.status) {
        res.status(200).json({
          status: response.status,
          message: response.message,
          result: {},
        });
      }
    } catch (error) {
      next(error);
    }
  }
  async resetforgotpassword(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      console.log("in the reset");
      const token = req.params.token as string | undefined;
      console.log(token, "is the extracted");
      if (!token) {
        return res.status(401).json({
          status: false,
          message: "Invalid token",
          result: {},
        });
      }

      const { password } = req.body;

      if (!password || password.trim() === "") {
        return res.status(400).json({
          status: false,
          message: "Password is required",
          result: {},
        });
      }
      console.log("hi");
      const response = await this.userAuthInteractor.resetforgotpassword(
        password,
        token
      );

      if (response.status) {
        res.status(200).json({
          status: response.status,
          message: response.message,
          result: {},
        });
      }
    } catch (error) {
      next(error);
    }
  }
  async checkRefreshToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const refreshToken = req.cookies.User_refreshToken;
      if (!refreshToken) {
        return res.status(401).json({
          status: false,
          message: "Bad Parameters - Refresh token missing.",
          result: {},
        });
      }

      const response = await this.userAuthInteractor.checkRefreshToken(
        refreshToken
      );

      if (response.status) {
        res.cookie("User_accessToken", response.result, {
          httpOnly: true,
          sameSite: "strict",
          maxAge: 15 * 60 * 1000,
        });
        return res.status(200).json({
          status: true,
          message: "Access token refreshed successfully.",
          result: {},
        });
      } else {
        return res.status(401).json({
          status: false,
          message: response.message,
          result: {},
        });
      }
    } catch (error) {
      next(error);
    }
  }

  async logOut(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      console.log("in logout");
      res.clearCookie("User_accessToken");
      res.status(200).json({ message: "Logout successful" });
    } catch (error) {
      next(error);
    }
  }
}

export default UserAuthController;
