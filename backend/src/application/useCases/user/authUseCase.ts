import IUserAuthInteractor from "../../../domain/entites/iuseCase/iAuth";
import { IUser } from "../../../domain/entites/imodels/Iuser";
import { iEmailService } from "../../../domain/services/IEmailService";
import iUserRepository from "../../../domain/entites/irepositories/iuserRepositories";
import { validateUserInput } from "../../../frameWorks/utils/middleware/helpers/validationHelpers";
import { iOTPService } from "../../../domain/services/iOTPService";
import jwt from "jsonwebtoken";
import { generatingSignUpToken } from "../../../frameWorks/utils/jwt";

class userAuthInteractor implements IUserAuthInteractor {
  constructor(
    private readonly Repository: iUserRepository,
    private readonly nodeMailer: iEmailService,
    private readonly optGenerator: iOTPService
  ) {}
  async userSingUp(
    data: IUser
  ): Promise<{ status: Boolean; message: string; result: {} }> {
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
}

export default userAuthInteractor;
