// import { config } from "dotenv";
import {
  ILawyer,
  IProfessionalData,
} from "../../../domain/entites/imodels/iLawyer";
import IUserResult from "../../../domain/entites/imodels/IUserResult";
import iLawyerRepository from "../../../domain/entites/irepositories/ilawyerRepositories";
import ILawyerAuthInteractor from "../../../domain/entites/iuseCase/iLawyerAuth";
import { iEmailService } from "../../../domain/services/IEmailService";
import { iJwtService } from "../../../domain/services/ijwtService";
import { iOTPService } from "../../../domain/services/iOTPService";
import { S3Service } from "../../../frameWorks/config/s3Setup";
import { CustomError } from "../../../frameWorks/middleware/errorHandiler";
import {
  HttpStatusCode,
  MessageError,
  UserRole,
} from "../../../frameWorks/utils/helpers/Enums";
import { config } from "../../../frameWorks/config/envConfig";
import {
  decodeSingUpToken,
  generatingSignUpToken,
} from "../../../frameWorks/utils/jwt";
import { validatePassword } from "../../../frameWorks/utils/validatePassword";
class LawyerAuthInteractor implements ILawyerAuthInteractor {
  constructor(
    private readonly Repository: iLawyerRepository,
    private readonly nodeMailer: iEmailService,
    private readonly optGenerator: iOTPService,
    private readonly jwt: iJwtService,
    private s3Service: S3Service
  ) {}

  ///////////////////

  async lawyerSingUp(
    data: ILawyer,
    file?: Express.Multer.File
  ): Promise<{ statusCode: number; message: string; result: string | {} }> {
    try {
      const { email, userName, password } = data;
      const LawyerExists = await this.Repository.lawyerAlreadyExist(email);
      if (LawyerExists) {
        return {
          statusCode: HttpStatusCode.Forbidden,
          message: "User Already Exists",
          result: {},
        };
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
      return {
        statusCode: HttpStatusCode.OK,
        message: "OTP sent successfully",
        result: SingUPTempToken,
      };
    } catch (error: any) {
      throw error;
    }
  }

  /////////////////

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
      const currentTime = Math.floor(Date.now() / 1000);
      if (decodeToken.otpExpiresAt < currentTime)
        return {
          statusCode: HttpStatusCode.Unauthorized,
          message: "OTP has expired",
          result: undefined,
        };
      if (otp !== decodeToken.OTP)
        return {
          statusCode: HttpStatusCode.Forbidden,
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
      const jwtToken = this.jwt.generateToken(
        creatingNewLawyer._id,
        UserRole.Lawyer
      );
      const { password, ...userDataWithoutPassword } =
        creatingNewLawyer.toObject();
      return {
        statusCode: HttpStatusCode.OK,
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

  /////////////////////

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
            const key = `legalProBarCouncilIndiaCertificate/${Date.now()}-${
              file.originalname
            }`;
            const uploadedUrl = this.s3Service.uploadFile(file, key);
            data.barCouncilCertificate = key || "";
          }
        } else if (fieldname === "imageKerala") {
          for (const file of filesArray) {
            const key = `legalProBarCouncilKeralaCertificate/${Date.now()}-${
              file.originalname
            }`;
            const uploadedUrl = this.s3Service.uploadFile(file, key);
            data.stateBarCouncilCertificate = key || "";
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
        statusCode: HttpStatusCode.OK,
        message: "From submitted SuccessFully",
        result: {},
      };
    } catch (error) {
      throw error;
    }
  }

  ////////////////

  async lawyerLogin(user: { email: string; password: string }): Promise<{
    status: boolean;
    message: string;
    result: IUserResult | null;
    statusCode: number;
  }> {
    try {
      const { email, password } = user;
      const validLawyer = await this.Repository.validLawyer(email);
      if (!validLawyer) {
        const error: CustomError = new Error();
        error.message = "invalid Email ";
        error.statusCode = HttpStatusCode.BadRequest;
        throw error;
      }
      if (validLawyer.block) {
        const error: CustomError = new Error(MessageError.Blocked);
        error.statusCode = HttpStatusCode.Unauthorized;
        throw error;
      }
      if (validLawyer.verified === "not_verified") {
        const error: CustomError = new Error();
        error.message =
          "Your account is pending approval. Please wait for the admin to verify your account.";
        error.statusCode = 401;
        throw error;
      }

      const validPassword = validatePassword(password, validLawyer.password);
      if (!validPassword) {
        const error: CustomError = new Error();
        error.message = "Incorrect Password";
        error.statusCode = 400;
        throw error;
      }
      const profile_picture = validLawyer.profile_picture;
      const getProfile = await this.s3Service.fetchFile(profile_picture);

      validLawyer.profile_picture = getProfile;
      const jwtToken = this.jwt.generateToken(validLawyer._id, UserRole.Lawyer);
      const jwtRefreshToken = this.jwt.generateRefreshToken(
        validLawyer._id,
        UserRole.Lawyer
      );
      const { password: userPassword, ...DataWithoutPassword } = validLawyer;

      return {
        statusCode: HttpStatusCode.OK,
        status: true,
        message: "logged SuccessFully",
        result: {
          user: DataWithoutPassword,
          tokenJwt: jwtToken,
          jwtRefreshToken: jwtRefreshToken,
        },
      };
    } catch (error) {
      throw error;
    }
  }

  ///////////

  async resendOtp(token: string): Promise<{
    statusCode: number;
    status: boolean;
    message: string;
    result: string | null;
  }> {
    try {
      const OTP = this.optGenerator.generateOTP();
      const decodeToken = decodeSingUpToken(token);
      console.log(decodeToken);
      const currentTime = Math.floor(Date.now() / 1000);
      console.log(decodeToken.otpExpiresAt);
      if (decodeToken.exp < currentTime) {
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
        statusCode: 200,
        status: true,
        message: "New OTP has been sent successfully",
        result: newSignUpToken,
      };
    } catch (error) {
      throw error;
    }
  }
  async sendForgotPasswordLink(email: string): Promise<{
    statusCode: number;
    status: boolean;
    message: string;
    result: string | null;
  }> {
    try {
      const lawyerExists = await this.Repository.validLawyer(email);
      if (!lawyerExists) {
        const error: CustomError = new Error("lawyer not found");
        error.statusCode = 400;
        throw error;
      }
      const resetToken = this.jwt.generateToken(
        lawyerExists._id,
        UserRole.Lawyer
      );
      const resetUrl = `${config.LAWYER_ForgotPassword_Link}${resetToken}`;

      this.nodeMailer.sendResetLink(
        lawyerExists.email,
        resetUrl,
        lawyerExists.userName
      );

      return {
        statusCode: 200,
        status: true,
        message: "Reset Password Link sended to Email",
        result: null,
      };
    } catch (error) {
      throw error;
    }
  }

  //////////////////

  async resetforgotpassword(
    password: string,
    token: string | any
  ): Promise<{
    statusCode: number;
    status: boolean;
    message: string;
    result: string | null;
  }> {
    try {
      const decoded = this.jwt.verifyToken(token);
      console.log(decoded?.id, "is the decoded token");
      if (!decoded) {
        console.log("Hi");
        const error: CustomError = new Error("invalid Token");
        error.statusCode = 401;
        throw error;
      }
      console.log(decoded.id, "is the id");
      const validUser = await this.Repository.getId(decoded?.id);
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
        statusCode: 200,
        message: "password Resetted successFully",
        result: null,
      };
    } catch (error) {
      throw error;
    }
  }

  /////////

  async checkRefreshToken(token: string): Promise<{
    statusCode: number;
    status: boolean;
    message: string;
    result: string | null;
  }> {
    try {
      const verifyRefreshToken = this.jwt.VerifyTokenRefresh(token);

      if (verifyRefreshToken?.role === "lawyer") {
        const existUser = await this.Repository.getId(verifyRefreshToken.id);
        if (!existUser) {
          return {
            statusCode: 401,
            status: false,
            message: "Authorization denied. User does not exist.",
            result: null,
          };
        }
        console.log("existingUser._id", existUser._id);
        const newJwtAccessToken = this.jwt.generateToken(
          existUser._id,
          UserRole.Lawyer
        );
        return {
          statusCode: 200,
          status: true,
          message: "Access token refreshed successfully.",
          result: newJwtAccessToken,
        };
      } else {
        return {
          statusCode: 400,
          status: false,
          message: "Invalid role in refresh token.",
          result: null,
        };
      }
    } catch (error) {
      throw error;
    }
  }

  ///////////

  async updateProfessionalData(
    data: any,
    file?: Express.Multer.File,
    id?: string
  ): Promise<{ statusCode: number; message: string; result: string | {} }> {
    try {
      let updateData;
      if (file) {
        const key = `lawyer-profiles/${Date.now()}-${file.originalname}`;
        const uploadPromise = this.s3Service.uploadFile(file, key);
        data.profile_picture = key;
      }

      const updateLawyer = await this.Repository.updateLawyerProfileData(
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
        message: "profile Updated SuccessFully",
        result: {},
      };
    } catch (error) {
      throw error;
    }
  }
}

export default LawyerAuthInteractor;
