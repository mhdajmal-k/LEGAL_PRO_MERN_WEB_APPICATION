import { ITransaction } from "../imodels/ITransaction";

interface IUserProfileRepository {
  updateProfileData(data: any): Promise<any>;
  validUserPassword(
    currentPassword: string,
    id: string,
    newPassword: string
  ): Promise<any>;
  getWalletBalance(id: string): Promise<string | number>;
  getTransactionDetails(id: string): Promise<ITransaction[]>;
}
export default IUserProfileRepository;
