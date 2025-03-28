import { IUser } from "../../../domain/entites/imodels/Iuser";
import {
  IProfileUpdateData,
  IUpdateResponse,
} from "../../../domain/entites/imodels/iUserProfle";
import IUserProfileRepository from "../../../domain/entites/irepositories/iuserProfileRepostiry";
import IUserProfileInteractor from "../../../domain/entites/iuseCase/iUserProfile";
import { IS3Service } from "../../../domain/services/Is3";
import { CustomError } from "../../../frameWorks/middleware/errorHandiler";
import run from "../../../frameWorks/services/geminiAi";

class userProfileInteractor implements IUserProfileInteractor {
  constructor(
    private readonly Repository: IUserProfileRepository,
    private readonly s3Service: IS3Service
  ) { }
  async updateProfile(
    data: IProfileUpdateData,
    file: Express.Multer.File | null
  ): Promise<IUpdateResponse<IUser>> {
    try {
      if (file) {
        const key = `lawyer-profiles/${Date.now()}-${file.originalname}`;
        await this.s3Service.uploadFile(file, key);
        // const url = await this.s3Service.fetchFile(key);
        data.file = key as string;
      }
      const updateProfile = await this.Repository.updateProfileData(data);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...userDataWithoutPassword } = updateProfile.toObject();
      return {
        status: true,
        message: "Profile updated successfully",
        result: userDataWithoutPassword,
        statusCode: 200,
      };
    } catch (error: any) {
      return {
        status: true,
        message: "Profile filed ",
        result: error.message,
        statusCode: 500,
      };
    }
  }
  async resetPassword({
    currentPassword,
    newPassword,
    id,
  }: {
    currentPassword: string;
    newPassword: string;
    id: string;
  }): Promise<{ status: boolean; message: string; result: null }> {
    try {
      const checkValidPasswordAndUpdatePassword =
        await this.Repository.validUserPassword(
          currentPassword,
          id,
          newPassword
        );
      if (!checkValidPasswordAndUpdatePassword) {
        const error: CustomError = new Error("Failed to reset Password");
        error.statusCode = 400;
        throw error;
      }
      return {
        status: true,
        message: "Password has been reset successfully",
        result: null,
      };
    } catch (error: any) {
      throw Error(error.message);
    }
  }
  async AiSearch(
    prompt: string
  ): Promise<{ status: boolean; message: string; result: string }> {
    try {
      const response = await run(prompt);

      const filteredResult = response?.replace(/\*\*(.*?)\*\*/g, "$1");
      return {
        status: true,
        message: "",
        result: filteredResult as string,
      };
    } catch (error: any) {
      throw Error(error.message);
    }
  }
  async walletDetails(
    id: string | undefined
  ): Promise<{ status: boolean; message: string; result: {} }> {
    try {
      const walletBalance = await this.Repository.getWalletBalance(id!);
      const getTransactionDetails = await this.Repository.getTransactionDetails(
        id!
      );
      const data = {
        walletBalance,
        getTransactionDetails,
      };

      return {
        status: true,
        message: "",
        result: data,
      };
    } catch (error) {
      throw Error("Failed to fetching the wallet Data");
    }
  }

  async getProfileData(id: string): Promise<IUpdateResponse<IUser>> {
    try {
      const userData = await this.Repository.getProfileData(id);
      if (userData) {
        userData.profilePicture = await this.s3Service.fetchFile(
          String(userData.profilePicture)
        );
      }

      return {
        statusCode: 200,
        status: true,
        message: "",
        result: userData,
      };
    } catch (error: any) {
      throw error.message;
    }
  }
}

export default userProfileInteractor;
