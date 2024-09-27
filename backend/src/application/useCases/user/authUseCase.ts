import IUserAuthInteractor from "../../../domain/entites/iuseCase/iAuth";
import { IUser } from "../../../domain/entites/imodels/Iuser";
import { iEmailService } from "../../../domain/services/IEmailService";
import iUserRepository from "../../../domain/entites/irepositories/iuserRepositories";
import { iOTPService } from "../../../domain/services/iOTPService";
import {
  decodeSingUpToken,
  generatingSignUpToken,
} from "../../../frameWorks/utils/jwt";
import bcryptjs from "bcryptjs";
import { validateUserInput } from "../../../frameWorks/utils/helpers/validationHelpers";
import { iJwtService } from "../../../domain/services/ijwtService";
import IUserResult from "../../../domain/entites/imodels/IUserResult";
import { validatePassword } from "../../../frameWorks/utils/validatePassword";
import { CustomError } from "../../../frameWorks/middleware/errorHandiler";

class userAuthInteractor implements IUserAuthInteractor {
  constructor(
    private readonly Repository: iUserRepository,
    private readonly nodeMailer: iEmailService,
    private readonly optGenerator: iOTPService,
    private readonly jwt: iJwtService
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
      const validPassword = validatePassword(password, validUser.password);
      if (!validPassword) {
        return {
          status: false,
          message: "Incorrect Password",
          result: null,
        };
      }
      const jwtToken = this.jwt.generateToken(validUser._id, "user");
      const { password: userPassword, ...userDataWithoutPassword } =
        validUser.toObject();

      return {
        status: true,
        message: "logged SuccessFully",
        result: {
          user: userDataWithoutPassword,
          tokenJwt: jwtToken,
        },
      };
    } catch (error) {
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
      if (decodeToken.otpExpiresAt < currentTime) {
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
}

export default userAuthInteractor;
