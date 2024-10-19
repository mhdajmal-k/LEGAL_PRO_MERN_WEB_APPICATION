import IUserLawyerRepository from "../../../domain/entites/irepositories/IUserLawyerRepositories";
import { IS3Service } from "../../../domain/services/Is3";
import IUsersLawyerInteractor from "../../../domain/entites/iuseCase/IUserLawyerList";
import { CustomError } from "../../../frameWorks/middleware/errorHandiler";
import { ILawyer } from "../../../domain/entites/imodels/iLawyer";
import { IUpdateResponse } from "../../../domain/entites/imodels/iUserProfle";

class UserLawyerInteractor implements IUsersLawyerInteractor {
  constructor(
    private readonly Repository: IUserLawyerRepository,
    private readonly s3Service: IS3Service
  ) {}
  async getVerifiedLawyers(): Promise<any> {
    try {
      const getVerifiedLawyers = await this.Repository.getVerifiedLawyers();
      if (!getVerifiedLawyers) {
        const error: CustomError = new Error();
        error.message = "Incorrect Password";
        error.statusCode = 400;
        throw error;
      }
      const updatedVerifiedLawyers = await Promise.all(
        getVerifiedLawyers.map(async (lawyer: any) => {
          if (lawyer.profile_picture) {
            lawyer.profile_picture = await this.s3Service.fetchFile(
              lawyer.profile_picture
            );
          }
          return lawyer;
        })
      );
      console.log(updatedVerifiedLawyers);
      return {
        statusCode: 200,
        status: true,
        message: "lawyer Got successFully",
        result: updatedVerifiedLawyers,
      };
    } catch (error) {
      throw error;
    }
  }
  async getLawyerById(id: string): Promise<IUpdateResponse<ILawyer>> {
    try {
      const getLawyer = await this.Repository.getLawyerById(id);
      if (!getLawyer) {
        const error: CustomError = new Error("lawyer not found");
        error.statusCode = 400;
        throw error;
      }
      getLawyer.profile_picture = await this.s3Service.fetchFile(
        getLawyer.profile_picture
      );
      return {
        message: "lawyer got successFully",
        result: getLawyer,
        status: true,
        statusCode: 200,
      };
    } catch (error) {
      throw error;
    }
  }
}

export default UserLawyerInteractor;
