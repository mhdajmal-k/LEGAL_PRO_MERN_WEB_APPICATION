import iUserRepository from "../../../domain/entites/irepositories/iuserRepositories";
import User from "../../../frameWorks/database/models/userModel";

class UserAuthRepository implements iUserRepository {
  async userAlreadyExist(email: string): Promise<boolean> {
    const user = await User.findOne({ email: email });
    console.log(user);
    return !!user;
  }
}
export default UserAuthRepository;
