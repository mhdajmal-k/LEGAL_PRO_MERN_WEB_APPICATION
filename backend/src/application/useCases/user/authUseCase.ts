import IUserAuthInteractor from "../../../domain/entites/iuseCase/iAuth";
import { IUser } from "../../../domain/entites/imodels/Iuser";
import { iEmailService } from "../../../domain/services/IEmailService";
import iUserRepository from "../../../domain/entites/irepositories/iuserRepositories";
import { iOTPService } from "../../../domain/services/iOTPService";
import {
  decodeSingUpToken,
  generatingSignUpToken,
} from "../../../frameWorks/utils/jwt";
import { stat } from "fs";
import { validateUserInput } from "../../../frameWorks/utils/helpers/validationHelpers";
import { iJwtService } from "../../../domain/services/ijwtService";
import IUserResult from "../../../domain/entites/imodels/IUserResult";

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
      await this.nodeMailer.sendOTP(email, OTP, userName);
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
}

export default userAuthInteractor;
