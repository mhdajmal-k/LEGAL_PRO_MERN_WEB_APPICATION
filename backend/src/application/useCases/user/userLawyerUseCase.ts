import IUserLawyerRepository from "../../../domain/entites/irepositories/IUserLawyerRepositories";
import { IS3Service } from "../../../domain/services/Is3";
import IUsersLawyerInteractor from "../../../domain/entites/iuseCase/IUserLawyerList";
import { CustomError } from "../../../frameWorks/middleware/errorHandiler";
import { ILawyer, LawyerQuery } from "../../../domain/entites/imodels/iLawyer";
import { IUpdateResponse } from "../../../domain/entites/imodels/iUserProfle";

class UserLawyerInteractor implements IUsersLawyerInteractor {
  constructor(
    private readonly Repository: IUserLawyerRepository,
    private readonly s3Service: IS3Service
  ) {}
  async getVerifiedLawyers(
    currentPage: number,
    limit: number,
    query: LawyerQuery
  ): Promise<{
    status: boolean;
    statusCode: number;
    message: string;
    result: {};
    totalPages?: number;
  }> {
    try {
      console.log(currentPage, "is te auth");
      console.log(limit, "is te auth");
      const getVerifiedLawyers = await this.Repository.getVerifiedLawyers(
        currentPage,
        limit,
        query
      );
      if (!getVerifiedLawyers) {
        const error: CustomError = new Error();
        error.message = "Incorrect Password";
        error.statusCode = 400;
        throw error;
      }
      const totalLawyers = await this.Repository.getTotalCountOfLawyers(
        "lawyer",
        query
      );

      const totalPages = Math.ceil(totalLawyers / limit);
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
        totalPages: totalPages,
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
  async getLawyerslot(lawyerId: string): Promise<{
    statusCode: number;
    status: boolean;
    message: string;
    result: string | {};
  }> {
    try {
      const slots = await this.Repository.getLawyerSlots(lawyerId);
      if (!slots) {
        const error: CustomError = new Error("lawyer not found");
        error.statusCode = 400;
        throw error;
      }
      const lawyerDetails = {
        _id: slots[0].lawyerId._id,
        userName: slots[0].lawyerId.userName,
        profile_picture: await this.s3Service.fetchFile(
          slots[0].lawyerId.profile_picture
        ), // Fetch the profile picture
        city: slots[0].lawyerId.city,
        state: slots[0].lawyerId.state,
        designation: slots[0].lawyerId.designation,
        years_of_experience: slots[0].lawyerId.years_of_experience,
      };
      const formattedSlots = slots.map((slot: any) => ({
        _id: slot._id,
        date: slot.date,
        availability: slot.availability.map((availabilitySlot: any) => ({
          timeSlot: availabilitySlot.timeSlot,
          fee: availabilitySlot.fee,
          status: availabilitySlot.status,
          _id: availabilitySlot._id,
        })),
        fees: slot.fees,
      }));
      return {
        message: "Slots retrieved successfully",
        result: {
          lawyerDetails,
          slots: formattedSlots,
        },
        status: true,
        statusCode: 200,
      };
    } catch (error) {
      throw error;
    }
  }
}

export default UserLawyerInteractor;
