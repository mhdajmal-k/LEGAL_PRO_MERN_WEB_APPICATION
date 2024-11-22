import { IUser } from "../../../domain/entites/imodels/Iuser";
import { IProfileUpdateData, IUpdateResponse } from "../imodels/iUserProfle";

interface IUserProfileInteractor {
  updateProfile(
    data: IProfileUpdateData,
    file: Express.Multer.File | null
  ): Promise<IUpdateResponse<IUser>>;
  resetPassword({
    currentPassword,
    newPassword,
    id,
  }: {
    currentPassword: string;
    newPassword: string;
    id: string;
  }): Promise<{
    status: boolean;
    message: string;
    result: null;
  }>;
  AiSearch(prompt: string): Promise<{
    status: boolean;
    message: string;
    result: string;
  }>;
  walletDetails(id: string | undefined): Promise<{
    status: boolean;
    message: string;
    result: {};
  }>;
}
export default IUserProfileInteractor;
