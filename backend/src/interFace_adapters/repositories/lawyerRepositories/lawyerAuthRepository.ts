import { ILawyer } from "../../../domain/entites/imodels/iLawyer";
import { IUser } from "../../../domain/entites/imodels/Iuser";
import iLawyerRepository from "../../../domain/entites/irepositories/ilawyerRepositories";
import Lawyer from "../../../frameWorks/database/models/lawyerModel";

class LawyerAuthRepository implements iLawyerRepository {
  async createLawyer(data: ILawyer): Promise<any> {}
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
    }
  }

  async lawyerAlreadyExist(email: string): Promise<boolean> {
    const user = await Lawyer.findOne({ email: email }).lean();
    return !!user;
  }
}
export default LawyerAuthRepository;
