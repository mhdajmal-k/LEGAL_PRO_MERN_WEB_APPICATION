import { Types } from "mongoose";
import { IUser } from "../../../domain/entites/imodels/Iuser";
import iUserRepository from "../../../domain/entites/irepositories/iuserRepositories";
import User from "../../../frameWorks/database/models/userModel";
import { hashPassword } from "../../../frameWorks/utils/helpers/passwordHelper";

class UserAuthRepository implements iUserRepository {
  async userAlreadyExist(email: string): Promise<boolean> {
    const user = await User.findOne({ email: email }).lean();
    return !!user;
  }
  async createUser(data: IUser): Promise<any> {
    try {
      const hashedPassword = hashPassword(data.password);
      const newUser = new User({
        userName: data.userName,
        email: data.email,
        password: hashedPassword,
      });
      try {
        await newUser.save();
        return newUser;
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async createUserFromGoogle(data: IUser): Promise<any> {
    try {
      const newUser = new User({
        userName: data.userName,
        email: data.email,
        password: Math.random().toString(36),
      });
      try {
        await newUser.save();
        return newUser;
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async validUser(email: string): Promise<any> {
    try {
      const user = await User.findOne({ email: email }).lean();
      if (user) {
        return user;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
    }
  }
  async getId(id: string): Promise<Types.ObjectId | null | any> {
    try {
      const userId = await User.findById(id).lean();
      console.log(userId, " is the middware");
      return userId ? userId : null;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
export default UserAuthRepository;
