import { IUser } from "../imodels/Iuser";

interface IUserAuthInteractor {
  userSingUp(
    user: IUser
  ): Promise<{ status: Boolean; message: string; result: {} }>;
}

export default IUserAuthInteractor;
