import { IUser } from "../imodels/Iuser";
import IUserResult from "../imodels/IUserResult";

interface IAdminInteractor {
  adminLogin(
    user: IUser
  ): Promise<{ status: boolean; message: string; result: IUserResult | null }>;
}

export default IAdminInteractor;
