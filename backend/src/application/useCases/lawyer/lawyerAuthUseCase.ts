import { ILawyer } from "../../../domain/entites/imodels/iLawyer";
import iLawyerRepository from "../../../domain/entites/irepositories/ilawyerRepositories";
import ILawyerAuthInteractor from "../../../domain/entites/iuseCase/iLawyerAuth";
import { iEmailService } from "../../../domain/services/IEmailService";
import { iJwtService } from "../../../domain/services/ijwtService";
import { iOTPService } from "../../../domain/services/iOTPService";
import { S3Service } from "../../../frameWorks/config/s3Setup";
import { CustomError } from "../../../frameWorks/middleware/errorHandiler";
import {
  decodeSingUpToken,
  generatingSignUpToken,
} from "../../../frameWorks/utils/jwt";
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
      const LawyerExists = await this.Repository.lawyerAlreadyExist(email);
      if (LawyerExists) {
        return { statusCode: 409, message: "User Already Exists", result: {} };
      }
      // let uploadPromise: Promise<string> | undefined;
      if (file) {
        const key = `lawyer-profiles/${Date.now()}-${file.originalname}`;
        const uploadPromise = this.s3Service.uploadFile(file, key);
        data.profile_picture = key;
      }
      const OTP = this.optGenerator.generateOTP();
      this.nodeMailer.sendOTP(email, OTP, userName);
      const SingUPTempToken = generatingSignUpToken(data, OTP);
      // await Promise.all([uploadPromise, emailPromise]);
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
    try {
      const decodeToken = decodeSingUpToken(token);
      console.log(decodeToken);

      const currentTime = Math.floor(Date.now() / 1000);
      if (decodeToken.otpExpiresAt < currentTime)
        return {
          statusCode: 401,
          message: "OTP has expired",
          result: undefined,
        };

      if (otp !== decodeToken.OTP)
        return {
          statusCode: 401,
          message: "entered Invalid OTP",
          result: undefined,
        };
      const creatingNewLawyer = await this.Repository.createLawyer(
        decodeToken.user
      );
      if (!creatingNewLawyer) {
        const error = new Error();
        error.message = "Failed to create new user";
        throw error;
      }

      const jwtToken = this.jwt.generateToken(creatingNewLawyer._id, "lawyer");
      const { password, ...userDataWithoutPassword } =
        creatingNewLawyer.toObject();
      return {
        statusCode: 201,
        message: "OTP verified successfully",
        result: {
          user: userDataWithoutPassword,
          tokenJwt: jwtToken,
        },
      };
    } catch (error) {
      throw error;
    }
  }
}

export default LawyerAuthInteractor;
