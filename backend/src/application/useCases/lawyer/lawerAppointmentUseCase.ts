import ILawyerAppointmentRepository from "../../../domain/entites/irepositories/ILawyerAppointmentRepositories";
import IUserLawyerRepository from "../../../domain/entites/irepositories/IUserLawyerRepositories";
import iUserRepository from "../../../domain/entites/irepositories/iuserRepositories";
import ILawyerAppointmentInteractor from "../../../domain/entites/iuseCase/ILawyerAppointment";
import { iEmailService } from "../../../domain/services/IEmailService";
import { IS3Service } from "../../../domain/services/Is3";
import { CustomError } from "../../../frameWorks/middleware/errorHandiler";
import { razorpayInstance } from "../../../frameWorks/services/razorPay";
import {
  HttpStatusCode,
  MessageError,
} from "../../../frameWorks/utils/helpers/Enums";

class LawyerAppointmentInteractor implements ILawyerAppointmentInteractor {
  constructor(
    private readonly LawyerAppointmentRepository: ILawyerAppointmentRepository,
    private s3Service: IS3Service,
    private readonly nodeMailer: iEmailService,
    private readonly UserRepository: iUserRepository,
    private readonly UserLawyerRepository: IUserLawyerRepository
  ) {}
  async getAllAppointmentBasedStatus(
    status: string,
    userId: string,
    currentPage: number,
    limit: number
  ): Promise<{
    statusCode: number;
    status: boolean;
    message: string;
    result: string | {};
    totalPages?: number;
  }> {
    try {
      const appointments =
        await this.LawyerAppointmentRepository.getAllAppointmentBasedStatus(
          status,
          userId,
          currentPage,
          limit
        );
      if (!appointments) {
        const error: CustomError = new Error(MessageError.AppointmentNotFound);
        error.statusCode = HttpStatusCode.NotFound;
        throw error;
      }
      const totalLawyers =
        await this.LawyerAppointmentRepository.getTotalCountOfAppointment(
          status,
          userId
        );

      const totalPages = Math.ceil(totalLawyers / limit);

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
      const appointment =
        await this.LawyerAppointmentRepository.getAppointmentById(
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
  async cancellingAppointment(appointmentId: string): Promise<{
    statusCode: number;
    status: boolean;
    message: string;
    result: string | {};
  }> {
    try {
      const getAppointment =
        await this.LawyerAppointmentRepository.getAppointmentById(
          appointmentId
        );
      if (!getAppointment) {
        const error: CustomError = new Error(MessageError.AppointmentNotFound);
        error.statusCode = HttpStatusCode.NotFound;
        throw error;
      }
      const razorpay_payment_id = getAppointment?.razorpayPaymentId!;
      const consultationFeeWithoutConvenienceFee =
        getAppointment?.subTotal * 100;
      const issueRefund = await razorpayInstance.payments.refund(
        razorpay_payment_id,
        { amount: consultationFeeWithoutConvenienceFee }
      );
      if (!issueRefund) {
        const error: CustomError = new Error(MessageError.RefundInitiatedFiled);
        error.statusCode = HttpStatusCode.NotFound;
        throw error;
      }
      console.log(issueRefund);

      await this.LawyerAppointmentRepository.cancelAppointmentById(
        appointmentId,
        issueRefund.id,
        "Cancelled"
      );
      const slot = getAppointment?.slotId;
      const bookedSpecificSlot = getAppointment?.appointmentTime;
      const updateSlot =
        await this.LawyerAppointmentRepository.updateStatusSlotBySpecifSlotId(
          slot as string,
          bookedSpecificSlot as string,
          false
        );
      if (!updateSlot) {
        const error: CustomError = new Error(MessageError.SlotNotFound);
        error.statusCode = HttpStatusCode.NotFound;
        throw error;
      }
      console.log("jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj");
      console.log(getAppointment.lawyerId, "sssssssssssssssssssssssss");
      const validLawyer = await this.UserLawyerRepository.getLawyerById(
        getAppointment.lawyerId._id.toString()
      );
      console.log(validLawyer, "iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii");
      console.log(updateSlot.userId);
      const user = await this.UserRepository.getId(
        getAppointment?.userId._id.toString()
      );
      console.log(user, "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
      const emailSentToLawyer =
        this.nodeMailer.sendCancellationConfirmationToLawyer(
          validLawyer?.email,
          validLawyer.userName,
          {
            date: getAppointment.appointmentDate.toDateString(),
            time: bookedSpecificSlot,
            userName: user.userName,
          }
        );
      const emailSentToUser = this.nodeMailer.sendCancellationNotification(
        user?.email,
        user?.userName,
        {
          date: getAppointment.appointmentDate.toDateString(),
          time: bookedSpecificSlot,
          lawyerName: validLawyer.userName,
        }
      );
      if (!emailSentToLawyer || !emailSentToUser)
        console.error("Failed to send booking confirmation");
      return {
        statusCode: HttpStatusCode.OK,
        status: true,
        message: MessageError.lawyerCancelAppointment,
        result: {},
      };
    } catch (error) {
      console.log(error, "is the cancelling Appointment Error");
      throw error;
    }
  }
}
export default LawyerAppointmentInteractor;
