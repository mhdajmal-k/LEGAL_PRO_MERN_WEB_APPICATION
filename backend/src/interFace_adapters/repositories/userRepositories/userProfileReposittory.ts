import { ITransaction } from "../../../domain/entites/imodels/ITransaction";
import { IUser } from "../../../domain/entites/imodels/Iuser";
import IUserProfileRepository from "../../../domain/entites/irepositories/iuserProfileRepostiry";
import Transaction from "../../../frameWorks/database/models/transactionModel";
import User from "../../../frameWorks/database/models/userModel";
import { CustomError } from "../../../frameWorks/middleware/errorHandiler";
import {
  comparePassword,
  hashPassword,
} from "../../../frameWorks/utils/helpers/passwordHelper";
class UserProfileRepository implements IUserProfileRepository {
  async updateProfileData(data: any): Promise<any> {
    try {
      console.log(data, "is the repo data");
      const updateUser = await User.findByIdAndUpdate(
        data.id,
        {
          $set: {
            userName: data.userName,
            email: data.email,
            phoneNumber: data.phoneNumber ?? null,
            profilePicture: data.file,
          },
        },
        {
          new: true,
        }
      );
      console.log(updateUser, "is the updated User");
      return updateUser;
    } catch (error) {
      throw new Error("filed to update UserData");
    }
  }
  async validUserPassword(
    currentPassword: string,
    id: string,
    newPassword: string
  ): Promise<any> {
    try {
      const validUser = await User.findById({ _id: id });
      if (!validUser) {
        const error: CustomError = new Error("Invalid User ");
        error.statusCode = 400;
        throw error;
      }
      console.log(validUser.password, "is the userPassword");
      const validUserPassword = comparePassword(
        currentPassword,
        validUser.password
      );

      if (!validUserPassword) {
        const error: CustomError = new Error("Incorrect current Password");
        error.statusCode = 400;
        throw error;
      }

      const hashedPassword = hashPassword(newPassword);
      validUser.password = hashedPassword;
      await validUser.save();
      return validUserPassword;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async getWalletBalance(id: string): Promise<string | number> {
    try {
      const user = await User.findById(id, { walletBalance: 1 });
      if (!user) {
        throw new Error("User not found");
      }
      return user.walletBalance;
    } catch (error) {
      console.error("Error fetching wallet balance:", error);
      throw new Error("Failed to retrieve wallet balance.");
    }
  }

  async getTransactionDetails(id: string): Promise<ITransaction[]> {
    try {
      const transactions = await Transaction.find({ userId: id });
      if (!transactions || transactions.length === 0) {
        throw new Error("No transactions found for this user");
      }
      return transactions;
    } catch (error) {
      console.error("Error fetching transaction details:", error);
      throw new Error("Failed to retrieve transaction details.");
    }
  }
  async getProfileData(id: string): Promise<IUser> {
    try {
      const userData = await User.findById(id, {
        userName: 1,
        email: 1,
        profilePicture: 1,
        phoneNumber: 1,
      });
      if (!userData) {
        throw new Error("User not found");
      }
      return userData as IUser;
    } catch (error: any) {
      throw error.message;
    }
  }
}
export default UserProfileRepository;
