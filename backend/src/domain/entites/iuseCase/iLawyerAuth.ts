import { ILawyer } from "../imodels/iLawyer";
import IUserResult from "../imodels/IUserResult";

interface ILawyerAuthInteractor {
  lawyerSingUp(
    user: ILawyer
  ): Promise<{ statusCode: number; message: string; result: string | {} }>;
  verifyOtp(
    otp: string,
    token: string
  ): Promise<{
    statusCode: number;
    message: string;
    result?: {} | ILawyer | undefined;
  }>;
  //   laLogin(
  //     user: IUser
  //   ): Promise<{ status: boolean; message: string; result: IUserResult | null }>;
  //   resendOtp(
  //     token: string
  //   ): Promise<{ status: boolean; message: string; result: string | null }>;
}

export default ILawyerAuthInteractor;
