import iAdminRepository from "../../../domain/entites/irepositories/IadminRepositries";
import User from "../../../frameWorks/database/models/userModel";
import { hashPassword } from "../../../frameWorks/utils/helpers/passwordHelper";

class AdminRepository implements iAdminRepository {
  async adminAlreadyExist(email: string, role: string): Promise<any> {
    const lawyer = await User.findOne({ email: email, role: role }).lean();
    return lawyer;
  }
  async createAdmin(data: any, role: string): Promise<any> {
    const hashedPassword = hashPassword(data.password);
    try {
      const newUser = new User({
        email: data.email,
        password: hashedPassword,
        role: role,
      });
      try {
        await newUser.save();
        console.log(newUser, "is hte new user");
        return newUser;
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async getUser(): Promise<any> {
    try {
      const users = await User.find({ role: { $ne: "admin" } })
        .select("-password")
        .sort({ createdAt: -1 })
        .lean();

      console.log(users, "is th eusesrs");

      return users;
    } catch (error) {
      throw new Error("Could not fetch users");
    }
  }
}

export default AdminRepository;
