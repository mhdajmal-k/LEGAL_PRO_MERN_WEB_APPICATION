import { ILawyer } from "../../../domain/entites/imodels/iLawyer";
import iLawyerRepository from "../../../domain/entites/irepositories/ilawyerRepositories";
import Lawyer from "../../../frameWorks/database/models/lawyerModel";
import { hashPassword } from "../../../frameWorks/utils/helpers/passwordHelper";

class LawyerAuthRepository implements iLawyerRepository {
  async createLawyer(data: ILawyer): Promise<any> {
    try {
      const hashedPassword = hashPassword(data.password);
      const newUser = new Lawyer({
        userName: data.userName,
        email: data.email,
        password: hashedPassword,
        city: data.city,
        gender: data.gender,
        zipcode: data.zipcode,
        state: data.state,
        profile_picture: data.profile_picture,
      });
      try {
        await newUser.save();
        return newUser;
      } catch (error) {
        throw error;
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async validLayer(email: string): Promise<any> {
    try {
      const user = await Lawyer.findOne({ email: email }).lean();
      if (user) {
        return user;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async lawyerAlreadyExist(email: string): Promise<boolean> {
    const lawyer = await Lawyer.findOne({ email: email }).lean();
    return !!lawyer;
  }
}
export default LawyerAuthRepository;
