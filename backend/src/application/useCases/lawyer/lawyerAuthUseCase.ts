import { ILawyer } from "../../../domain/entites/imodels/iLawyer";
import iLawyerRepository from "../../../domain/entites/irepositories/ilawyerRepositories";
import ILawyerAuthInteractor from "../../../domain/entites/iuseCase/iLawyerAuth";
import { iEmailService } from "../../../domain/services/IEmailService";
import { iJwtService } from "../../../domain/services/ijwtService";
import { iOTPService } from "../../../domain/services/iOTPService";
import { generatingSignUpToken } from "../../../frameWorks/utils/jwt";
class LawyerAuthInteractor implements ILawyerAuthInteractor {
  constructor(
    private readonly Repository: iLawyerRepository,
    private readonly nodeMailer: iEmailService,
    private readonly optGenerator: iOTPService,
    private readonly jwt: iJwtService
  ) {}
  async lawyerSingUp(
    data: ILawyer
  ): Promise<{ statusCode: number; message: string; result: string | {} }> {
    try {
      console.log(data, "from the auth lawery");
      const { email, userName, password } = data;
      const userExists = await this.Repository.lawyerAlreadyExist(email);
      if (userExists) {
        return { statusCode: 409, message: "user Already Exists", result: {} };
      }
      const OTP = this.optGenerator.generateOTP();
      this.nodeMailer.sendOTP(email, OTP, userName);
      const SingUPTempToken = generatingSignUpToken(data, OTP);
      return {
        statusCode: 200,
        message: "OTP sended SuccessFully",
        result: SingUPTempToken,
      };
    } catch (error) {
      throw error;
    }
  }
  async verifyOtp(
    otp: string,
    token: string
  ): Promise<{
    statusCode: number;
    message: string;
    result?: {} | ILawyer | undefined;
  }> {
    return { statusCode: 200, message: "success", result: {} };
  }
}

export default LawyerAuthInteractor;
