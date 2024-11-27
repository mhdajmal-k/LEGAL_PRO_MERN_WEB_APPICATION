import IUserAppointmentRepository from "../../../domain/entites/irepositories/IUserAppointmentRepository";
import IUserLawyerRepository from "../../../domain/entites/irepositories/IUserLawyerRepositories";
import IUserAppointmentInteractor from "../../../domain/entites/iuseCase/iUserAppointment";
import { IS3Service } from "../../../domain/services/Is3";
import { CustomError } from "../../../frameWorks/middleware/errorHandiler";
import crypto from "crypto";
import {
  HttpStatusCode,
  MessageError,
} from "../../../frameWorks/utils/helpers/Enums";
import { razorpayInstance } from "../../../frameWorks/services/razorPay";
import { config } from "../../../frameWorks/config/envConfig";
import { iEmailService } from "../../../domain/services/IEmailService";
import iUserRepository from "../../../domain/entites/irepositories/iuserRepositories";

class UserAppointmentInteractor implements IUserAppointmentInteractor {
  constructor(
    private readonly UserLawyerRepository: IUserLawyerRepository,
    private readonly AppointmentRepository: IUserAppointmentRepository,
    private readonly s3Service: IS3Service,
    private readonly nodeMailer: iEmailService,
    private readonly UserRepository: iUserRepository
  ) {}
  async createAppointment(
    LawyerId: string,
    slotId: string,
    fee: number,
    specificSlotId: string,
    selectedTime: string,
    selectedDate: Date,
    description: string,
    userId: string,
    file: Express.Multer.File | null
  ): Promise<{
    statusCode: number;
    status: boolean;
    message: string;
    result: string | {};
  }> {
    try {
      const validLawyer = await this.UserLawyerRepository.getLawyerById(
        LawyerId
      );
      if (!validLawyer) {
        const error: CustomError = new Error(MessageError.LawyerNotFound);
        error.statusCode = HttpStatusCode.NotFound;
        throw error;
      }
      if (validLawyer.block === true) {
        const error: CustomError = new Error(MessageError.Blocked);
        error.statusCode = HttpStatusCode.Forbidden;
        throw error;
      }
      const validSlot = await this.UserLawyerRepository.getSlotBySlotId(slotId);
      if (!validSlot) {
        const error: CustomError = new Error(MessageError.SlotNotFound);
        error.statusCode = HttpStatusCode.Forbidden;
        throw error;
      }

      const specificSlot =
        await this.UserLawyerRepository.getSlotBySpecifSlotId(
          validSlot._id,
          selectedTime
        );
      if (!specificSlot) {
        const error: CustomError = new Error(MessageError.SlotNotFound);
        error.statusCode = HttpStatusCode.Forbidden;
        throw error;
      }
      if (specificSlot.availability[0].fee != fee) {
        const error: CustomError = new Error(MessageError.FeeChanged);
        error.statusCode = HttpStatusCode.BadRequest;
        throw error;
      }
      if (specificSlot.availability[0].status == true) {
        const error: CustomError = new Error(MessageError.AlreadyBooked);
        error.statusCode = HttpStatusCode.BadRequest;
        throw error;
      }
      let key;
      if (file) {
        key = `lawyer-caseImage/${Date.now()}-${file.originalname}`;

        const uploadPromise = await this.s3Service.uploadFile(file, key);
      }
      const convenienceFee = Math.ceil(fee * Number(config.CONVINEANCEFEE));
      const subTotal = Number(convenienceFee) + Number(fee);

      const createdAppointment =
        await this.AppointmentRepository.createAppointment(
          LawyerId,
          slotId,
          Number(fee),
          specificSlotId,
          selectedTime,
          selectedDate,
          description,
          userId,
          Number(convenienceFee),
          Number(subTotal),
          key
        );

      if (!createdAppointment) {
        const error: CustomError = new Error(
          MessageError.AppointmentCreationError
        );
        error.statusCode = HttpStatusCode.InternalServerError;
        throw error;
      }

      return {
        statusCode: HttpStatusCode.Created,
        status: true,
        message: MessageError.AppointmentCreated,
        result: createdAppointment,
      };
    } catch (error: any) {
      throw error.message;
    }
  }

  ////////////////////

  async getAppointment(appointmentId: string): Promise<{
    statusCode: number;
    status: boolean;
    message: string;
    result: string | {};
  }> {
    try {
      const appointment = await this.AppointmentRepository.getAppointmentById(
        appointmentId
      );
      if (!appointment) {
        const error: CustomError = new Error(MessageError.AppointmentNotFound);
        error.statusCode = HttpStatusCode.NotFound;
        throw error;
      }

      appointment.lawyerId.profile_picture = await this.s3Service.fetchFile(
        appointment.lawyerId.profile_picture
      );

      return {
        statusCode: HttpStatusCode.OK,
        status: true,
        message: MessageError.AppointmentGot,
        result: appointment,
      };
    } catch (error: any) {
      throw Error(error.message);
    }
  }

  /////////////////////////////////

  async createPayment(appointmentId: string): Promise<{
    statusCode: number;
    status: boolean;
    message: string;
    result: string | {};
  }> {
    try {
      const appointment = await this.AppointmentRepository.getAppointmentById(
        appointmentId
      );

      if (!appointment) {
        const error: CustomError = new Error(MessageError.AppointmentNotFound);
        error.statusCode = HttpStatusCode.NotFound;
        throw error;
      }
      const LawyerId = appointment.lawyerId._id;
      const validLawyer = await this.UserLawyerRepository.getLawyerById(
        LawyerId.toString()
      );
      if (!validLawyer) {
        const error: CustomError = new Error(MessageError.LawyerNotFound);
        error.statusCode = HttpStatusCode.NotFound;
        throw error;
      }
      if (validLawyer.block === true) {
        const error: CustomError = new Error(MessageError.Blocked);
        error.statusCode = HttpStatusCode.Forbidden;
        throw error;
      }
      const slotId = appointment.slotId;
      const validSlot = await this.UserLawyerRepository.getSlotBySlotId(slotId);
      if (!validSlot) {
        const error: CustomError = new Error(MessageError.SlotNotFound);
        error.statusCode = HttpStatusCode.Forbidden;
        throw error;
      }
      const specificSlotId = appointment.appointmentTime;
      const specificSlot =
        await this.UserLawyerRepository.getSlotBySpecifSlotId(
          validSlot._id,
          specificSlotId
        );

      if (!specificSlot) {
        const error: CustomError = new Error(MessageError.SlotNotFound);
        error.statusCode = HttpStatusCode.Forbidden;
        throw error;
      }
      const fee = appointment.consultationFee;
      if (specificSlot.availability[0].fee != fee) {
        const newConsolationFee = specificSlot.availability[0].fee;
        const newSpecifSlotId = specificSlot.availability[0]._id;
        const newConvenienceFee = Math.ceil(newConsolationFee * 0.03);
        const subTotal = Number(newConvenienceFee) + Number(newConsolationFee);
        const updateAppointment =
          await this.AppointmentRepository.updateConsultationFee(
            appointmentId,
            newConsolationFee,
            newConvenienceFee,
            subTotal,
            newSpecifSlotId
          );
        if (updateAppointment) {
          const error: CustomError = new Error(MessageError.FeeChanged);
          error.statusCode = HttpStatusCode.BadRequest;
          throw error;
        } else {
          const error: CustomError = new Error(
            MessageError.AppointmentCreationError
          );
          error.statusCode = HttpStatusCode.InternalServerError;
          throw error;
        }
      }

      if (specificSlot.availability[0].status == true) {
        const error: CustomError = new Error(MessageError.AlreadyBooked);
        error.statusCode = HttpStatusCode.BadRequest;
        throw error;
      }

      const updateSlot =
        await this.UserLawyerRepository.updateStatusSlotBySpecifSlotId(
          slotId,
          specificSlotId,
          true
        );

      const options = {
        amount: appointment.subTotal * 100,
        currency: "INR",
        receipt: appointmentId,
      };

      const order = await razorpayInstance.orders.create(options);
      await this.createPaymentTimeout(appointmentId);
      return {
        statusCode: 201,
        status: true,
        message: "Payment Initiated successfully",
        result: {
          orderId: order.id,
          amount: order.amount,
          currency: order.currency,
          receipt: order.receipt,
          key: process.env.RAZORPAY_API_KEY,
        },
      };
    } catch (error: any) {
      throw Error(error.message);
    }
  }

  ////Payment Time out

  async createPaymentTimeout(appointmentId: string): Promise<void> {
    setTimeout(async () => {
      const PendingPaymentAppointment =
        await this.AppointmentRepository.getAllPendingPaymentAppointment(
          appointmentId
        );
      if (!PendingPaymentAppointment) {
        return;
      }
      const slot = PendingPaymentAppointment?.slotId;
      const bookedSpecificSlot = PendingPaymentAppointment?.appointmentTime;
      const updateSlot =
        await this.UserLawyerRepository.updateStatusSlotBySpecifSlotId(
          slot as string,
          bookedSpecificSlot as string,
          false
        );
      if (!updateSlot) {
        const error: CustomError = new Error(MessageError.SlotNotFound);
        error.statusCode = HttpStatusCode.NotFound;
        throw error;
      }
      const canceledAppointment =
        await this.AppointmentRepository.updateFailedAppointmentById(
          appointmentId
        );
      console.log(
        `Appointment ${PendingPaymentAppointment?._id} was cancelled due to payment timeout.`
      );
    }, 5 * 60 * 1000);
  }

  //////verify Payment

  async verifyRazorPayPayment(
    razorpay_order_id: string,
    razorpay_payment_id: string,
    razorpay_signature: string,
    appointmentId: string
  ): Promise<{
    statusCode: number;
    status: boolean;
    message: string;
    result: string | {};
  }> {
    try {
      const concatData = razorpay_order_id + "|" + razorpay_payment_id;
      const expectedSign = crypto
        .createHmac("sha256", config.RAZORPAY_SECRET!)
        .update(concatData)
        .digest("hex");
      if (expectedSign !== razorpay_signature) {
        throw new Error("Invalid payment Done");
      }
      const updatedAppointment =
        await this.AppointmentRepository.updateAppointmentStatus(
          appointmentId,
          razorpay_payment_id,
          "Confirmed",
          "Success"
        );
      if (!updatedAppointment) {
        const error: CustomError = new Error(MessageError.AppointmentNotFound);
        error.statusCode = HttpStatusCode.Forbidden;
        throw error;
      }
      const slot = updatedAppointment.slotId;
      const bookedSpecificSlot = updatedAppointment.appointmentTime;
      const updateSlot =
        await this.UserLawyerRepository.updateStatusSlotBySpecifSlotId(
          slot,
          bookedSpecificSlot,
          true
        );
      if (!updateSlot) {
        const error: CustomError = new Error(MessageError.SlotNotFound);
        error.statusCode = HttpStatusCode.NotFound;
        throw error;
      }
      const validLawyer = await this.UserLawyerRepository.getLawyerById(
        updatedAppointment.lawyerId.toString()
      );

      const user = await this.UserRepository.getId(
        updatedAppointment?.userId.toString()
      );

      const emailSentToLawyer = this.nodeMailer.sendBookingConfirmation(
        validLawyer?.email,
        validLawyer.userName,
        {
          date: updatedAppointment.appointmentDate.toDateString(),
          time: bookedSpecificSlot,
          lawyerName: user.userName,
        }
      );
      const emailSentToUser = this.nodeMailer.sendBookingConfirmation(
        user?.email,
        user.userName,
        {
          date: updatedAppointment.appointmentDate.toDateString(),
          time: bookedSpecificSlot,
          lawyerName: validLawyer.userName,
        }
      );
      if (!emailSentToLawyer || !emailSentToUser)
        console.error("Failed to send booking confirmation");
      return {
        statusCode: HttpStatusCode.Created,
        status: true,
        message: MessageError.PaymentSuccessFull,
        result: updatedAppointment,
      };
    } catch (error: any) {
      throw error.message;
    }
  }

  ///get All appointment

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
        await this.AppointmentRepository.getAllAppointmentBasedStatus(
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
        await this.AppointmentRepository.getTotalCountOfAppointment(
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
    } catch (error: any) {
      throw error.message;
    }
  }

  ////cancel Appointment

  async cancellingAppointment(
    appointmentId: string,
    refundTo: string
  ): Promise<{
    statusCode: number;
    status: boolean;
    message: string;
    result: string | {};
  }> {
    try {
      const getAppointment =
        await this.AppointmentRepository.getAppointmentById(appointmentId);
      if (!getAppointment) {
        const error: CustomError = new Error(MessageError.AppointmentNotFound);
        error.statusCode = HttpStatusCode.NotFound;
        throw error;
      }
      if (refundTo === "wallet") {
        // Add to wallet
        const addToWallet = await this.UserRepository.addToWallet(
          String(getAppointment.userId),
          getAppointment.consultationFee
        );

        if (!addToWallet) {
          const error: CustomError = new Error(MessageError.UserNotFound);
          error.statusCode = HttpStatusCode.NotFound;
          throw error;
        }

        // Add to transactions
        const transactionData = {
          userId: String(getAppointment.userId),
          amount: getAppointment.consultationFee,
          type: "credit",
          description: "Refunded consultation fee to wallet",
        };

        const addToTransaction = await this.UserRepository.createTransaction(
          transactionData
        );

        if (!addToTransaction) {
          const error: CustomError = new Error("Failed to record transaction.");
          error.statusCode = HttpStatusCode.InternalServerError;
          throw error;
        }
        const canceledAppointment =
          await this.AppointmentRepository.cancelAppointmentById(
            appointmentId,
            "",
            "Cancelled"
          );
      } else {
        const razorpay_payment_id = getAppointment?.razorpayPaymentId!;
        const consultationFeeWithoutConvenienceFee =
          getAppointment?.consultationFee! * 100;
        const issueRefund = await razorpayInstance.payments.refund(
          razorpay_payment_id,
          { amount: consultationFeeWithoutConvenienceFee }
        );
        if (!issueRefund) {
          const error: CustomError = new Error(
            MessageError.RefundInitiatedFiled
          );
          error.statusCode = HttpStatusCode.NotFound;
          throw error;
        }
        const canceledAppointment =
          await this.AppointmentRepository.cancelAppointmentById(
            appointmentId,
            issueRefund.id,
            "Cancelled"
          );
      }
      const slot = getAppointment?.slotId;
      const bookedSpecificSlot = getAppointment?.appointmentTime;
      const updateSlot =
        await this.UserLawyerRepository.updateStatusSlotBySpecifSlotId(
          slot as string,
          bookedSpecificSlot as string,
          false
        );
      if (!updateSlot) {
        const error: CustomError = new Error(MessageError.SlotNotFound);
        error.statusCode = HttpStatusCode.NotFound;
        throw error;
      }

      return {
        statusCode: HttpStatusCode.OK,
        status: true,
        message: MessageError.cancelAppointment,
        result: {},
      };
    } catch (error: any) {
      throw Error(error.message);
    }
  }

  async cancellingAppointmentWithOutRefund(appointmentId: string): Promise<{
    statusCode: number;
    status: boolean;
    message: string;
    result: string | {};
  }> {
    try {
      const getAppointment =
        await this.AppointmentRepository.getAppointmentById(appointmentId);
      if (!getAppointment) {
        const error: CustomError = new Error(MessageError.AppointmentNotFound);
        error.statusCode = HttpStatusCode.NotFound;
        throw error;
      }

      const canceledAppointment =
        await this.AppointmentRepository.cancelAppointmentById(
          appointmentId,
          "",
          "Cancelled"
        );
      const slot = canceledAppointment?.slotId;
      const bookedSpecificSlot = canceledAppointment?.appointmentTime;
      const updateSlot =
        await this.UserLawyerRepository.updateStatusSlotBySpecifSlotId(
          slot as string,
          bookedSpecificSlot as string,
          false
        );
      if (!updateSlot) {
        const error: CustomError = new Error(MessageError.SlotNotFound);
        error.statusCode = HttpStatusCode.NotFound;
        throw error;
      }
      return {
        statusCode: HttpStatusCode.OK,
        status: true,
        message: MessageError.cancelAppointment,
        result: {},
      };
    } catch (error) {
      console.log(error, "is the cancelling Appointment Error");
      throw error;
    }
  }

  /////refund Function

  async getCancelledRefundStatus(appointmentId: string): Promise<{
    statusCode: number;
    status: boolean;
    message: string;
    result: string | {};
  }> {
    try {
      const cancelledAppointment =
        await this.AppointmentRepository.getCancelledAppointmentById(
          appointmentId
        );

      if (!cancelledAppointment) {
        const error: CustomError = new Error(MessageError.AppointmentNotFound);
        error.statusCode = HttpStatusCode.NotFound;
        throw error;
      }
      const refund_id = cancelledAppointment.razorpayPaymentId;
      const refundDetails = await razorpayInstance.refunds.fetch(refund_id);
      return {
        statusCode: HttpStatusCode.OK,
        status: true,
        message: "",
        result: refundDetails,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  ////filed Payment Appointment

  async filedPaymentAppointment(appointmentId: string): Promise<{
    statusCode: number;
    status: boolean;
    message: string;
    result: string | {};
  }> {
    try {
      const getAppointment =
        await this.AppointmentRepository.getAppointmentById(appointmentId);
      if (!getAppointment) {
        const error: CustomError = new Error(MessageError.AppointmentNotFound);
        error.statusCode = HttpStatusCode.NotFound;
        throw error;
      }
      const updatedAppointment =
        await this.AppointmentRepository.updateFailedAppointmentById(
          appointmentId
        );

      if (!updatedAppointment) {
        const error: CustomError = new Error(MessageError.AppointmentNotFound);
        error.statusCode = HttpStatusCode.Forbidden;
        throw error;
      }
      const slot = updatedAppointment.slotId;
      const bookedSpecificSlot = updatedAppointment.appointmentTime;
      const updateSlot =
        await this.UserLawyerRepository.updateStatusSlotBySpecifSlotId(
          slot,
          bookedSpecificSlot,
          false
        );
      if (!updateSlot) {
        const error: CustomError = new Error(MessageError.SlotNotFound);
        error.statusCode = HttpStatusCode.NotFound;
        throw error;
      }
      return {
        statusCode: HttpStatusCode.Forbidden,
        status: true,
        message: MessageError.paymentFiled,
        result: updatedAppointment,
      };
    } catch (error: any) {
      throw error.message;
    }
  }
  async completeAppointment(appointmentId: string): Promise<{
    statusCode: number;
    status: boolean;
    message: string;
    result: string | {};
  }> {
    try {
      const getAppointment =
        await this.AppointmentRepository.getAppointmentById(appointmentId);
      if (!getAppointment) {
        console.log("In here not found");
        const error: CustomError = new Error(MessageError.AppointmentNotFound);
        error.statusCode = HttpStatusCode.NotFound;
        throw error;
      }

      const updatedAppointment =
        await this.AppointmentRepository.updateAppointmentStatus(
          appointmentId,
          "",
          "Completed",
          "Success"
        );
      return {
        statusCode: HttpStatusCode.OK,
        status: true,
        message: MessageError.AppointmentCompleted,
        result: "",
      };
    } catch (error: any) {
      throw Error(error.message);
    }
  }
}

export default UserAppointmentInteractor;
