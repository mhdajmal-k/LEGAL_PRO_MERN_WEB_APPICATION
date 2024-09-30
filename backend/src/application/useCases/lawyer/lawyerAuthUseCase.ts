import { ILawyer } from "../../../domain/entites/imodels/iLawyer";
import iLawyerRepository from "../../../domain/entites/irepositories/ilawyerRepositories";
import ILawyerAuthInteractor from "../../../domain/entites/iuseCase/iLawyerAuth";
import { iEmailService } from "../../../domain/services/IEmailService";
import { iJwtService } from "../../../domain/services/ijwtService";
import { iOTPService } from "../../../domain/services/iOTPService";
import { S3Service } from "../../../frameWorks/config/s3Setup";
import { generatingSignUpToken } from "../../../frameWorks/utils/jwt";
class LawyerAuthInteractor implements ILawyerAuthInteractor {
  constructor(
    private readonly Repository: iLawyerRepository,
    private readonly nodeMailer: iEmailService,
    private readonly optGenerator: iOTPService,
    private readonly jwt: iJwtService,
    private s3Service: S3Service
  ) {}
  async lawyerSingUp(
    data: ILawyer,
    file?: Express.Multer.File
  ): Promise<{ statusCode: number; message: string; result: string | {} }> {
    try {
      const { email, userName, password } = data;
      const userExists = await this.Repository.lawyerAlreadyExist(email);
      if (userExists) {
        return { statusCode: 409, message: "User Already Exists", result: {} };
      }

      if (file) {
        const key = `lawyer-profiles/${Date.now()}-${file.originalname}`;
        await this.s3Service.uploadFile(file, key);
        data.profile_picture = key;
      }
      const OTP = this.optGenerator.generateOTP();
      this.nodeMailer.sendOTP(email, OTP, userName);
      const SingUPTempToken = this.jwt.generateToken(data, OTP);

      return {
        statusCode: 200,
        message: "OTP sent successfully",
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
