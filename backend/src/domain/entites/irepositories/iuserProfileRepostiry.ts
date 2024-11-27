import { ITransaction } from "../imodels/ITransaction";
import { IUser } from "../imodels/Iuser";

interface IUserProfileRepository {
  updateProfileData(data: any): Promise<any>;
  getProfileData(id: string): Promise<IUser>;
  validUserPassword(
    currentPassword: string,
    id: string,
    newPassword: string
  ): Promise<any>;
  getWalletBalance(id: string): Promise<string | number>;
  getTransactionDetails(id: string): Promise<ITransaction[]>;
}
export default IUserProfileRepository;
