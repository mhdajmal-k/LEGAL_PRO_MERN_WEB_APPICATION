import IUserLawyerRepository from "../../../domain/entites/irepositories/IUserLawyerRepositories";
import Lawyer from "../../../frameWorks/database/models/lawyerModel";
import { CustomError } from "../../../frameWorks/middleware/errorHandiler";
class UserLawyerRepositories implements IUserLawyerRepository {
  async getVerifiedLawyers(): Promise<any> {
    try {
      const getVerifiedLawyers = await Lawyer.find({
        verified: "verified",
      }).select("-password");
      console.log(getVerifiedLawyers, "is the repo");
      return getVerifiedLawyers;
    } catch (error) {
      throw error;
    }
  }
  async getLawyerById(id: string): Promise<any> {
    try {
      const getLawyer = await Lawyer.findById({ _id: id })
        .select("-password")
        .lean();
      if (!getLawyer) {
        const error: CustomError = new Error("lawyer not found");
        error.statusCode = 400;
        throw error;
      }
      console.log(getLawyer, "is htttttttttttttttttttttttttttttttttttt");
      return getLawyer;
    } catch (error) {
      throw error;
    }
  }
}
export default UserLawyerRepositories;
