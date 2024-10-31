import IUserAuthInteractor from "../../../domain/entites/iuseCase/iAuth";
import { IUser } from "../../../domain/entites/imodels/Iuser";
import { iEmailService } from "../../../domain/services/IEmailService";
import iUserRepository from "../../../domain/entites/irepositories/iuserRepositories";
import { iOTPService } from "../../../domain/services/iOTPService";

import bcryptjs from "bcryptjs";
import { iJwtService } from "../../../domain/services/ijwtService";
import IUserResult from "../../../domain/entites/imodels/IUserResult";
import { CustomError } from "../../../frameWorks/middleware/errorHandiler";
import { validateUserInput } from "../../../frameWorks/utils/helpers/validationHelpers";
import {
  decodeSingUpToken,
  generatingSignUpToken,
} from "../../../frameWorks/utils/jwt";
import { validatePassword } from "../../../frameWorks/utils/validatePassword";
import { IS3Service } from "../../../domain/services/Is3";

class userAuthInteractor implements IUserAuthInteractor {
  constructor(
    private readonly Repository: iUserRepository,
    private readonly nodeMailer: iEmailService,
    private readonly optGenerator: iOTPService,
    private readonly jwt: iJwtService,
    private readonly s3Service: IS3Service
  ) {}
  async userSingUp(
    data: IUser
  ): Promise<{ status: boolean; message: string; result: {} }> {
    try {
      const validateDataError = validateUserInput(data);
      const { email, userName, password } = data;
      if (validateDataError) {
        return { status: false, message: validateDataError, result: {} };
      }
      const userExists = await this.Repository.userAlreadyExist(email);
      if (userExists) {
        return { status: false, message: "user Already Exists", result: {} };
      }
      const OTP = this.optGenerator.generateOTP();
      this.nodeMailer.sendOTP(email, OTP, userName);
      const SingUPTempToken = generatingSignUpToken(data, OTP);
      return {
        status: true,
        message: "OTP sended SuccessFully",
        result: SingUPTempToken,
      };
    } catch (error: any) {
      return {
        status: false,
        message: error.message,
        result: {},
      };
    }
  }
  async verifyOtp(
    otp: string,
    token: string
  ): Promise<{
    status: boolean;
    message: string;
    result?: {} | IUserResult | undefined;
  }> {
    const decodeToken = decodeSingUpToken(token);
    console.log(decodeToken);
    const currentTime = Math.floor(Date.now() / 1000);
    if (decodeToken.otpExpiresAt < currentTime)
      return {
        status: false,
        message: "OTP has expired",
        result: undefined,
      };

    if (otp !== decodeToken.OTP)
      return {
        status: false,
        message: "entered Invalid OTP",
        result: undefined,
      };
    const creatingNewUser = await this.Repository.createUser(decodeToken.user);
    if (!creatingNewUser) {
      const error = new Error();
      error.message = "Failed to create new user";
      throw error;
    }

    if (!creatingNewUser)
      return {
        status: false,
        message: "Failed to create new user",
        result: undefined,
      };
    const jwtToken = this.jwt.generateToken(creatingNewUser._id, "user");
    const { password, ...userDataWithoutPassword } = creatingNewUser.toObject();
    return {
      status: true,
      message: "OTP verified successfully",
      result: {
        user: userDataWithoutPassword,
        tokenJwt: jwtToken,
      },
    };
  }
  async userLogin(
    user: IUser
  ): Promise<{ status: boolean; message: string; result: IUserResult | null }> {
    try {
      const { email, password } = user;
      const validUser = await this.Repository.validUser(email);
      if (!validUser) {
        return {
          status: false,
          message: "Invalid Email",
          result: null,
        };
      }
      if (validUser.block) {
        const error: CustomError = new Error(
          "oops you have been blocked By Admin"
        );
        error.statusCode = 401;
        throw error;
      }
      const validPassword = validatePassword(password, validUser.password);
      if (!validPassword) {
        return {
          status: false,
          message: "Incorrect Password",
          result: null,
        };
      }
      const jwtAccessToken = this.jwt.generateToken(validUser._id, "user");
      const jwtRefreshToken = this.jwt.generateRefreshToken(
        validUser._id,
        "user"
      );
      console.log(validUser, "is the valid user");
      validUser.profilePicture
        ? (validUser.profilePicture = await this.s3Service.fetchFile(
            validUser.profilePicture
          ))
        : "";

      const { password: userPassword, ...userDataWithoutPassword } = validUser;

      return {
        status: true,
        message: "logged SuccessFully",
        result: {
          user: userDataWithoutPassword,
          tokenJwt: jwtAccessToken,
          jwtRefreshToken: jwtRefreshToken,
        },
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async googleSignUP(
    user: IUser
  ): Promise<{ status: boolean; message: string; result: IUserResult | null }> {
    try {
      const { email, userName } = user;
      let validUser = await this.Repository.validUser(email);
      if (!validUser) {
        console.log(validUser, "is the auth");
        validUser = await this.Repository.createUserFromGoogle(user);
      }
      const jwtToken = this.jwt.generateToken(validUser._id, "user");
      const jwtRefreshToken = this.jwt.generateRefreshToken(
        validUser._id,
        "user"
      );
      const { ...userDataWithoutPassword } = validUser;

      return {
        status: true,
        message: "logged SuccessFully",
        result: {
          user: userDataWithoutPassword,
          tokenJwt: jwtToken,
          jwtRefreshToken: jwtRefreshToken,
        },
      };
    } catch (error) {
      console.log(error);
      return {
        status: false,
        message: "An error occurred during login",
        result: null,
      };
    }
  }
  async resendOtp(
    token: string
  ): Promise<{ status: boolean; message: string; result: string | null }> {
    try {
      const OTP = this.optGenerator.generateOTP();
      const decodeToken = decodeSingUpToken(token);
      console.log(decodeToken);
      const currentTime = Math.floor(Date.now() / 1000);
      if (decodeToken.exp < currentTime) {
        console.log("hi");
        const error: CustomError = new Error("Session is expired, try again");
        error.statusCode = 400;
        throw error;
      }
      this.nodeMailer.sendOTP(
        decodeToken.user.email,
        OTP,
        decodeToken.user.userName
      );
      const newSignUpToken = generatingSignUpToken(decodeToken.user, OTP);
      return {
        status: true,
        message: "New OTP has been sent successfully",
        result: newSignUpToken,
      };
    } catch (error) {
      throw error;
    }
  }
  async sendForgotPasswordLink(
    email: string
  ): Promise<{ status: boolean; message: string; result: string | null }> {
    try {
      const userExists = await this.Repository.validUser(email);
      if (!userExists) {
        const error: CustomError = new Error("User not found");
        error.statusCode = 400;
        throw error;
      }
      const resetToken = this.jwt.generateToken(userExists._id, "user");
      const resetUrl = `http://localhost:3000/forgotpassword/${resetToken}`;
      this.nodeMailer.sendResetLink(
        userExists.email,
        resetUrl,
        userExists.userName
      );

      return {
        status: true,
        message: "Reset Password Link sended to Email",
        result: null,
      };
    } catch (error) {
      throw error;
    }
  }
  async resetforgotpassword(
    password: string,
    token: string | any
  ): Promise<{ status: boolean; message: string; result: string | null }> {
    try {
      const decoded = this.jwt.verifyToken(token);
      console.log(decoded?.id, "is the decoded token");
      if (!decoded) {
        const error: CustomError = new Error("invalid Token");
        error.statusCode = 401;
        throw error;
      }
      const validUser = await this.Repository.getId(decoded.id);
      if (!validUser) {
        const error: CustomError = new Error("user not found");
        error.statusCode = 401;
        throw error;
      }
      const updatedPassword = await this.Repository.updatePassword(
        password,
        decoded.id
      );
      if (!updatedPassword) {
        const error: CustomError = new Error("Failed to update password");
        error.statusCode = 500;
        throw error;
      }
      return {
        status: true,
        message: "password Resetted successFully",
        result: null,
      };
    } catch (error) {
      throw error;
    }
  }
  async checkRefreshToken(
    token: string
  ): Promise<{ status: boolean; message: string; result: string | null }> {
    try {
      const verifyRefreshToken = this.jwt.VerifyTokenRefresh(token);

      if (verifyRefreshToken?.role === "user") {
        const existUser = await this.Repository.getId(verifyRefreshToken.id);

        if (!existUser) {
          return {
            status: false,
            message: "Authorization denied. User does not exist.",
            result: null,
          };
        }

        if (existUser.block) {
          return {
            status: false,
            message: "OOPS YOU HAVE BEEN BLOCKED BY ADMIN",
            result: null,
          };
        }

        const newJwtAccessToken = this.jwt.generateToken(existUser._id, "user");
        return {
          status: true,
          message: "Access token refreshed successfully.",
          result: newJwtAccessToken,
        };
      } else {
        return {
          status: false,
          message: "Invalid role in refresh token.",
          result: null,
        };
      }
    } catch (error) {
      console.error("Refresh token verification failed:", error);
      return {
        status: false,
        message: "Refresh token verification failed.",
        result: null,
      };
    }
  }
}

export default userAuthInteractor;
