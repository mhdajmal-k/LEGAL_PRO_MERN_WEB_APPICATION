import IUserProfileRepository from "../../../domain/entites/irepositories/iuserProfileRepostiry";
import User from "../../../frameWorks/database/models/userModel";
import { CustomError } from "../../../frameWorks/middleware/errorHandiler";
import {
  comparePassword,
  hashPassword,
} from "../../../frameWorks/utils/helpers/passwordHelper";
class UserProfileRepository implements IUserProfileRepository {
  async updateProfileData(data: any): Promise<any> {
    try {
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
}
export default UserProfileRepository;
