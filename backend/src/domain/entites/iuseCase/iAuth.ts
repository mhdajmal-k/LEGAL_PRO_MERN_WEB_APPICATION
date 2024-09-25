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
}

export default IUserAuthInteractor;
