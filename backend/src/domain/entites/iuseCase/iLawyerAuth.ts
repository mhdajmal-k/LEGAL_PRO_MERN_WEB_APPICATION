import { ILawyer, IProfessionalData } from "../imodels/iLawyer";
import { IUser } from "../imodels/Iuser";
import IUserResult from "../imodels/IUserResult";

interface ILawyerAuthInteractor {
  lawyerSingUp(
    user: ILawyer,
    file?: Express.Multer.File
  ): Promise<{ statusCode: number; message: string; result: string | {} }>;
  verifyOtp(
    otp: string,
    token: string
  ): Promise<{
    statusCode: number;
    message: string;
    result?: {} | ILawyer | undefined;
  }>;
  verifyProfessionalData(
    data: IProfessionalData,
    files?: { [fieldname: string]: Express.Multer.File[] },
    id?: string
  ): Promise<{ statusCode: number; message: string; result: string | {} }>;
  updateProfileData(
    data: IProfessionalData,
    file?: Express.Multer.File,
    id?: string
  ): Promise<{ statusCode: number; message: string; result: string | {} }>;
  lawyerLogin(user: { email: string; password: string }): Promise<{
    statusCode: number;
    status: boolean;
    message: string;
    result: IUserResult | null;
  }>;
  getProfileData(id: string): Promise<{ statusCode: number; message: string; result: ILawyer }>;
  sendForgotPasswordLink(email: string): Promise<{
    statusCode: number;
    status: boolean;
    message: string;
    result: string | null;
  }>;
  resetforgotpassword(
    password: string,
    token: string | any
  ): Promise<{
    statusCode: number;
    status: boolean;
    message: string;
    result: string | null;
  }>;
  checkRefreshToken(token: string): Promise<{
    statusCode: number;
    status: boolean;
    message: string;
    result: string | null;
  }>;
  resendOtp(token: string): Promise<{
    statusCode: number;
    status: boolean;
    message: string;
    result: string | null;
  }>;
  //   resendOtp(
  //     token: string
  //   ): Promise<{ status: boolean; message: string; result: string | null }>;
}

export default ILawyerAuthInteractor;
