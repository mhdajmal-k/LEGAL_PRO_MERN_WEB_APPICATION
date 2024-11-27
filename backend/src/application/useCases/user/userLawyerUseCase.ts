import IUserLawyerRepository from "../../../domain/entites/irepositories/IUserLawyerRepositories";
import { IS3Service } from "../../../domain/services/Is3";
import IUsersLawyerInteractor from "../../../domain/entites/iuseCase/IUserLawyerList";
import { CustomError } from "../../../frameWorks/middleware/errorHandiler";
import { ILawyer, LawyerQuery } from "../../../domain/entites/imodels/iLawyer";
import { IUpdateResponse } from "../../../domain/entites/imodels/iUserProfle";
import IUserAppointmentRepository from "../../../domain/entites/irepositories/IUserAppointmentRepository";
import {
  HttpStatusCode,
  MessageError,
} from "../../../frameWorks/utils/helpers/Enums";
import { IReview } from "../../../domain/entites/imodels/iReview";
import ILawyerBlogRepository from "../../../domain/entites/irepositories/iLawyerBlogRespositry";
import { IBlog } from "../../../domain/entites/imodels/iBlog";

class UserLawyerInteractor implements IUsersLawyerInteractor {
  constructor(
    private readonly Repository: IUserLawyerRepository,
    private readonly s3Service: IS3Service,
    private readonly AppointmentRepository: IUserAppointmentRepository,
    private readonly BlogRepository: ILawyerBlogRepository
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
      const getVerifiedLawyers = await this.Repository.getVerifiedLawyers(
        currentPage,
        limit,
        query
      );
      if (!getVerifiedLawyers) {
        const error: CustomError = new Error();
        error.message = "Error Fetching";
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
    } catch (error: any) {
      throw error.message;
    }
  }
  async creatingLawyerReview(
    appointmentId: string,
    rating: number,
    review: string
  ): Promise<{
    statusCode: number;
    status: boolean;
    message: string;
    result: string | {};
  }> {
    try {
      const validAppointmentId =
        await this.AppointmentRepository.getAppointmentById(appointmentId);
      if (!validAppointmentId) {
        const error: CustomError = new Error(MessageError.AppointmentNotFound);
        error.statusCode = HttpStatusCode.NotFound;
        throw error;
      }
      const addReview = await this.Repository.createRating(
        validAppointmentId.lawyerId._id,
        String(validAppointmentId.userId),
        rating,
        review
      );
      if (!addReview) {
        const error: CustomError = new Error(MessageError.ServerError);
        error.statusCode = HttpStatusCode.InternalServerError;
        throw error;
      }
      return {
        message: "Review Added SuccessFully",
        result: "",
        status: true,
        statusCode: HttpStatusCode.OK,
      };
    } catch (error: any) {
      throw error.message;
    }
  }
  async getLawyerReview(
    lawyerId: string,
    currentPage: number,
    limit: number
  ): Promise<{
    statusCode: number;
    status: boolean;
    message: string;
    result: IReview[];
  }> {
    try {
      const getReviews = await this.Repository.getReview(
        lawyerId,
        currentPage,
        limit
      );
      if (!getReviews) {
        const error: CustomError = new Error();
        error.message = "Error Fetching";
        error.statusCode = 400;
        throw error;
      }
      return {
        message: "Review Added SuccessFully",
        result: getReviews,
        status: true,
        statusCode: HttpStatusCode.OK,
      };
    } catch (error) {
      throw error;
    }
  }
  async getBlogs(
    currentPage: number,
    limit: number
  ): Promise<{
    statusCode: number;
    status: boolean;
    message: string;
    result: IBlog[];
  }> {
    try {
      const lawyerBlog = await this.BlogRepository.getAllBlogs(
        limit,
        currentPage
      );
      // const totalPages = Math.ceil(totalLawyers / limit);
      const updatedBlog = await Promise.all(
        lawyerBlog.map(async (blog: any) => {
          if (blog.author?.profile_picture) {
            blog.author.profile_picture = await this.s3Service.fetchFile(
              blog.author.profile_picture
            );
          }

          if (blog.image) {
            blog.image = await this.s3Service.fetchFile(blog.image);
          }

          return blog;
        })
      );

      return {
        status: true,
        statusCode: HttpStatusCode.OK,
        message: "blog Created",
        result: updatedBlog,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async topLawyersForRecommendation(): Promise<IUpdateResponse<ILawyer[]>> {
    try {
      const topLawyers = await this.Repository.getLawyerTopLawyers();
      const updatedTopLawyers = await Promise.all(
        topLawyers.map(async (lawyer: ILawyer) => {
          if (lawyer.profile_picture) {
            lawyer.profile_picture = await this.s3Service.fetchFile(
              lawyer.profile_picture
            );
          }
          return lawyer;
        })
      );
      return {
        status: true,
        statusCode: HttpStatusCode.OK,
        message: "",
        result: updatedTopLawyers,
      };
    } catch (error: any) {
      throw error.message;
    }
  }
}

export default UserLawyerInteractor;
