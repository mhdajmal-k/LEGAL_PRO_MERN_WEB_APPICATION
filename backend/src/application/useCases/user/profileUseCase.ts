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
  ) {}
  async updateProfile(
    data: IProfileUpdateData,
    file: Express.Multer.File | null
  ): Promise<IUpdateResponse<IUser>> {
    try {
      if (file) {
        const key = `lawyer-profiles/${Date.now()}-${file.originalname}`;
        await this.s3Service.uploadFile(file, key);
        const url = await this.s3Service.fetchFile(key);
        data.file = url as string;
      }
      const updateProfile = await this.Repository.updateProfileData(data);
      return {
        status: true,
        message: "Profile updated successfully",
        result: updateProfile,
        statusCode: 200,
      };
    } catch (error) {
      throw error;
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
      console.log(currentPassword, "is the current password");
      const checkValidPasswordAndUpdatePassword =
        await this.Repository.validUserPassword(
          currentPassword,
          id,
          newPassword
        );
      console.log(
        checkValidPasswordAndUpdatePassword,
        "is the validUserPassword"
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
    } catch (error) {
      throw error;
    }
  }
  async AiSearch(
    prompt: string
  ): Promise<{ status: boolean; message: string; result: string }> {
    try {
      const response = await run(prompt);
      const filteredResult = response.replace(/\*\*(.*?)\*\*/g, "$1");
      return {
        status: true,
        message: "",
        result: filteredResult as string,
      };
    } catch (error) {
      throw error;
    }
  }
}

export default userProfileInteractor;
