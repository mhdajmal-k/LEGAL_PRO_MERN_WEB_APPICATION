import { Certificate } from "crypto";
import { IUser } from "../../../domain/entites/imodels/Iuser";
import IUserResult from "../../../domain/entites/imodels/IUserResult";
import iAdminRepository from "../../../domain/entites/irepositories/IadminRepositries";
import IAdminInteractor from "../../../domain/entites/iuseCase/iadmin";
import { iJwtService } from "../../../domain/services/ijwtService";
import { config } from "../../../frameWorks/config/envConfig";
import { S3Service } from "../../../frameWorks/config/s3Setup";
import Lawyer from "../../../frameWorks/database/models/lawyerModel";
import { CustomError } from "../../../frameWorks/middleware/errorHandiler";
import { hashPassword } from "../../../frameWorks/utils/helpers/passwordHelper";
import { validatePassword } from "../../../frameWorks/utils/validatePassword";
import EmailService from "../../../frameWorks/services/mailer";
import e from "express";
import {
  HttpStatusCode,
  MessageError,
} from "../../../frameWorks/utils/helpers/Enums";
import {
  IAppointmentAdminSide,
  IAppointmentLawyerSide,
} from "../../../domain/entites/imodels/iAppontment";

class AdminInteractor implements IAdminInteractor {
  constructor(
    private readonly Repository: iAdminRepository,
    private readonly jwt: iJwtService,
    private s3Service: S3Service,
    private emailService: EmailService
  ) {}

  async adminLogin(
    user: IUser
  ): Promise<{ status: boolean; message: string; result: IUserResult | null }> {
    try {
      const { email, password } = user;
      let adminUser = await this.Repository.adminAlreadyExist(email, "admin");
      if (email !== config.ADMIN_EMAIL) {
        const error: CustomError = new Error("Invalid Credentials");
        error.statusCode = 401;
        throw error;
      }
      if (!adminUser) {
        if (password !== config.ADMIN_PASSWORD) {
          const error: CustomError = new Error("Invalid Credentials");
          error.statusCode = 401;
          throw error;
        }

        const adminData = {
          email: config.ADMIN_EMAIL,
          password: config.ADMIN_PASSWORD,
        };

        adminUser = await this.Repository.createAdmin(adminData, "admin");
      }

      if (!adminUser || !adminUser.password) {
        const error: CustomError = new Error("Failed to retrieve user data.");
        error.statusCode = 500;
        throw error;
      }

      const validPassword = validatePassword(password, adminUser.password);
      if (!validPassword) {
        const error: CustomError = new Error("Invalid Credentials");
        error.statusCode = 401;
        throw error;
      }
      const jwtToken = this.jwt.generateToken(adminUser._id, "admin");
      const jwtRefreshToken = this.jwt.generateRefreshToken(
        adminUser._id,
        "admin"
      );
      const { password: userPassword, ...userDataWithoutPassword } = adminUser;

      return {
        status: true,
        message: "Logged in Successfully",
        result: {
          user: userDataWithoutPassword,
          tokenJwt: jwtToken,
          jwtRefreshToken: jwtRefreshToken,
        },
      };
    } catch (error) {
      throw error;
    }
  }
  async getUsers(
    currentPage: number,
    limit: number
  ): Promise<{
    status: boolean;
    message: string;
    result: [];
    totalUsers?: number;
    totalPages?: number;
  }> {
    try {
      const allUser = await this.Repository.getUser(currentPage, limit);
      const totalUsers = await this.Repository.getTotalCount("user");
      const totalPages = Math.ceil(totalUsers / limit);
      if (!allUser) {
        return {
          status: false,
          message: "Failed to Get Users",
          result: [],
        };
      }

      return {
        status: true,
        message: "message fetched SuccessFully",
        result: allUser,
        totalUsers: totalUsers,
        totalPages: totalPages,
      };
    } catch (error) {
      throw error;
    }
  }
  async getPendingApprovalLawyers(): Promise<{
    statusCode: number;
    status: boolean;
    message: string;
    result: [];
  }> {
    try {
      const allUser = await this.Repository.getPendingApprovalLawyers();

      if (!allUser) {
        return {
          statusCode: 500,
          status: false,
          message: "Failed to Get Users",
          result: [],
        };
      }

      const updatedLawyer = await Promise.all(
        allUser.map(async (lawyer: any) => {
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
        message: "message fetched SuccessFully",
        result: allUser,
      };
    } catch (error) {
      throw error;
    }
  }
  async getLawyer(id: string): Promise<{
    statusCode: number;
    status: boolean;
    message: string;
    result: [];
  }> {
    try {
      const lawyer = await this.Repository.getLawyer(id);
      if (!lawyer) {
        const error: CustomError = new Error("Lawyer not found");
        error.statusCode = 404;
        throw error;
      }

      const profile_picture = lawyer.profile_picture;

      const getProfile = await this.s3Service.fetchFile(profile_picture);

      const certificates = await Promise.all(
        lawyer.certifications.map((certificate: any) => {
          return certificate.certificate
            ? this.s3Service.fetchFile(certificate.certificate)
            : Promise.resolve(null);
        })
      );

      lawyer.profile_picture = getProfile;
      lawyer.certifications = lawyer.certifications.map(
        (certification: any, index: number) => ({
          ...certification,
          certificate: certificates[index],
        })
      );
      return {
        statusCode: 200,
        status: true,
        message: "lawyer Got successFully",
        result: lawyer,
      };
    } catch (error) {
      throw error;
    }
  }
  async getLawyersList(
    currentPage: number,
    limit: number
  ): Promise<{
    statusCode: number;
    status: boolean;
    message: string;
    result: any[];
    totalLawyers?: number;
    totalPages?: number;
  }> {
    try {
      const lawyers = await this.Repository.getLawyers(currentPage, limit);
      if (!lawyers) {
        const error: CustomError = new Error("Lawyer not found");
        error.statusCode = 404;
        throw error;
      }
      const totalLawyers = await this.Repository.getTotalCount("lawyer");
      const totalPages = Math.ceil(totalLawyers / limit);
      const updatedLawyer = await Promise.all(
        lawyers.map(async (lawyer: any) => {
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
        result: updatedLawyer,
        totalLawyers: totalLawyers,
        totalPages: totalPages,
      };
    } catch (error) {
      throw error;
    }
  }

  async verifyLawyer(id: string): Promise<{
    statusCode: number;
    status: boolean;
    message: string;
    result: [];
  }> {
    try {
      const lawyer = await this.Repository.getLawyer(id);
      if (!lawyer) {
        const error: CustomError = new Error("Lawyer not found");
        error.statusCode = 404;
        throw error;
      }
      const verifyLawyer = await this.Repository.verifyLawyer(id);
      if (!verifyLawyer) {
        const error: CustomError = new Error("Failed to verify Lawyer");
        error.statusCode = 404;
        throw error;
      }
      const sendEmail = this.emailService.sendStatusNotification(
        verifyLawyer.email,
        "",
        verifyLawyer.userName,
        "Verified"
      );

      return {
        statusCode: 200,
        status: true,
        message: "Lawyer Verified SuccessFully",
        result: [],
      };
    } catch (error) {
      throw error;
    }
  }
  async unverifyLawyer(
    id: string,
    reason: string
  ): Promise<{
    statusCode: number;
    status: boolean;
    message: string;
    result: [];
  }> {
    try {
      const lawyer = await this.Repository.getLawyer(id);
      if (!lawyer) {
        const error: CustomError = new Error("Lawyer not found");
        error.statusCode = 404;
        throw error;
      }
      const verifyLawyer = await this.Repository.unverifyLawyer(id);
      if (!verifyLawyer) {
        const error: CustomError = new Error("Failed to verify Lawyer");
        error.statusCode = 404;
        throw error;
      }

      const sendEmail = this.emailService.sendStatusNotification(
        verifyLawyer.email,
        reason,
        verifyLawyer.userName,
        "Unverified"
      );

      return {
        statusCode: 200,
        status: true,
        message: "Lawyer unVerified SuccessFully",
        result: [],
      };
    } catch (error) {
      throw error;
    }
  }

  async blockandUnblock(
    id: string,
    blockState: boolean,
    action: string
  ): Promise<{
    statusCode: number;
    status: boolean;
    message: string;
    result: [];
  }> {
    try {
      const updateUserData = await this.Repository.blockorUnblock(
        id,
        blockState,
        action
      );
      if (!updateUserData) {
        const error: CustomError = new Error("Failed to verify Lawyer");
        error.statusCode = 404;
        throw error;
      }
      if (blockState == true) {
        return {
          statusCode: 200,
          status: true,
          message: `user blocked successFully`,
          result: [],
        };
      }
      return {
        statusCode: 200,
        status: true,
        message: `user UnBlocked successFully`,
        result: [],
      };
    } catch (error) {
      throw error;
    }
  }
  async allAppointments(
    status: string,
    currentPage: number,
    limit: number
  ): Promise<{
    statusCode: number;
    status: boolean;
    message: string;
    result: IAppointmentAdminSide[];
    totalPages?: number;
  }> {
    try {
      const appointments =
        await this.Repository.getAllAppointmentBasedStatusInAdmin(
          status,
          currentPage,
          limit
        );
      if (!appointments) {
        const error: CustomError = new Error(MessageError.AppointmentNotFound);
        error.statusCode = HttpStatusCode.NotFound;
        throw error;
      }
      const totalAppointment = await this.Repository.getTotalCountOfAppointment(
        status
      );

      const totalPages = Math.ceil(totalAppointment / limit);

      return {
        statusCode: HttpStatusCode.OK,
        status: true,
        message: MessageError.AppointmentGot,
        result: appointments,
        totalPages: totalPages,
      };
    } catch (error) {
      throw error;
    }
  }
  async getAppointment(appointmentId: string): Promise<{
    statusCode: number;
    status: boolean;
    message: string;
    result: string | {};
  }> {
    try {
      const appointment = await this.Repository.getAppointmentById(
        appointmentId
      );
      if (!appointment) {
        const error: CustomError = new Error(MessageError.AppointmentNotFound);
        error.statusCode = HttpStatusCode.NotFound;
        throw error;
      }

      if (appointment.imageUrl) {
        appointment.imageUrl = await this.s3Service.fetchFile(
          appointment.imageUrl
        );
      }

      appointment.lawyerId.profile_picture = await this.s3Service.fetchFile(
        appointment.lawyerId.profile_picture
      );
      appointment.userId.profilePicture = await this.s3Service.fetchFile(
        appointment.userId.profilePicture
      );
      return {
        statusCode: HttpStatusCode.OK,
        status: true,
        message: MessageError.AppointmentGot,
        result: appointment,
      };
    } catch (error) {
      throw error;
    }
  }
}
export default AdminInteractor;
