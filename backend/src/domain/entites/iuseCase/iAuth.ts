import { IUser } from "../imodels/Iuser";
import IUserResult from "../imodels/IUserResult";

interface IUserAuthInteractor {
  userSingUp(
    user: IUser
  ): Promise<{ status: boolean; message: string; result: object | null }>;
  verifyOtp(
    otp: string,
    token: string
  ): Promise<{
    status: boolean;
    message: string;
    result?: {} | IUserResult | undefined;
  }>;
  userLogin(
    user: IUser
  ): Promise<{ status: boolean; message: string; result: IUserResult | null }>;
  googleSignUP(
    user: IUser
  ): Promise<{ status: boolean; message: string; result: IUserResult | null }>;
  resendOtp(
    token: string
  ): Promise<{ status: boolean; message: string; result: string | null }>;
  sendForgotPasswordLink(
    email: string
  ): Promise<{ status: boolean; message: string; result: string | null }>;
  checkRefreshToken(
    token: string
  ): Promise<{ status: boolean; message: string; result: string | null }>;
  resetforgotpassword(
    password: string,
    token: string | any
  ): Promise<{ status: boolean; message: string; result: string | null }>;
}

export default IUserAuthInteractor;
