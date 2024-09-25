import { IUser } from "../../../domain/entites/imodels/Iuser";
import iUserRepository from "../../../domain/entites/irepositories/iuserRepositories";
import User from "../../../frameWorks/database/models/userModel";
import { hashPassword } from "../../../frameWorks/utils/helpers/passwordHelper";

class UserAuthRepository implements iUserRepository {
  async userAlreadyExist(email: string): Promise<boolean> {
    const user = await User.findOne({ email: email });
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
}
export default UserAuthRepository;
