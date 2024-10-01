import {
  ILawyer,
  IProfessionalData,
} from "../../../domain/entites/imodels/iLawyer";
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
      console.log(creatingNewLawyer, "is the creatingNewLawyer");

      const jwtToken = this.jwt.generateToken(creatingNewLawyer._id, "lawyer");
      console.log(jwtToken, "is the jwt token i createdfffffffffffffff");
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

  async verifyProfessionalData(
    data: IProfessionalData,
    files?: { [fieldname: string]: Express.Multer.File[] },
    id?: string
  ): Promise<{ statusCode: number; message: string; result: string | {} }> {
    try {
      const { barCouncilNumber, stateBarCouncilNumber } = data;
      for (const fieldname in files) {
        const filesArray = files[fieldname];
        if (fieldname === "imageIndia") {
          for (const file of filesArray) {
            const key = `lawyer-barCouncilIndia/${Date.now()}-${
              file.originalname
            }`;
            const uploadedUrl = await this.s3Service.uploadFile(file, key);
            data.barCouncilCertificate = uploadedUrl || "";
          }
        } else if (fieldname === "imageKerala") {
          for (const file of filesArray) {
            const key = `lawyer-barCouncilIndiaKerala/${Date.now()}-${
              file.originalname
            }`;
            const uploadedUrl = await this.s3Service.uploadFile(file, key);
            data.stateBarCouncilCertificate = uploadedUrl || "";
          }
        }
      }
      const certificates = [
        {
          certificateType: "Bar Council of India",
          enrolmentNumber: barCouncilNumber,
          certificate: data.barCouncilCertificate || "",
        },
        {
          certificateType: "State Bar Council of Kerala",
          enrolmentNumber: stateBarCouncilNumber || "",
          certificate: data.stateBarCouncilCertificate || "",
        },
      ];
      data.certificate = certificates;

      const updateLawyer = await this.Repository.updateLawyerProfessionalData(
        data,
        id as string
      );
      if (!updateLawyer) {
        const error: CustomError = new Error();
        error.message = "Failed to create Account Try agin";
        error.statusCode = 400;
        throw error;
      }

      return {
        statusCode: 201,
        message: "From submitted SuccessFully",
        result: {},
      };
    } catch (error) {
      throw error;
    }
  }
}

export default LawyerAuthInteractor;
