import { app } from "firebase-admin";
import IUserAppointmentRepository from "../../../domain/entites/irepositories/IUserAppointmentRepository";
import IUserLawyerRepository from "../../../domain/entites/irepositories/IUserLawyerRepositories";
import IUserAppointmentInteractor from "../../../domain/entites/iuseCase/iUserAppointment";
import { IS3Service } from "../../../domain/services/Is3";
import Appointment from "../../../frameWorks/database/models/appointmentModel";
import { CustomError } from "../../../frameWorks/middleware/errorHandiler";
import crypto from "crypto";
import {
  HttpStatusCode,
  MessageError,
} from "../../../frameWorks/utils/helpers/Enums";
import { razorpayInstance } from "../../../frameWorks/services/razorPay";
import { config } from "../../../frameWorks/config/envConfig";
import { appointmentId } from "../../../frameWorks/utils/helpers/randomAppontmentId";

class UserAppointmentInteractor implements IUserAppointmentInteractor {
  constructor(
    private readonly UserLawyerRepository: IUserLawyerRepository,
    private readonly AppointmentRepository: IUserAppointmentRepository,
    private readonly s3Service: IS3Service
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
        console.log("hi testing in here");
        const error: CustomError = new Error(MessageError.SlotNotFound);
        error.statusCode = HttpStatusCode.Forbidden;
        throw error;
      }
      if (specificSlot.availability[0].fee != fee) {
        console.log(specificSlot.availability[0].fee, "sssssssssssssss");
        const error: CustomError = new Error(MessageError.FeeChanged);
        error.statusCode = HttpStatusCode.BadRequest;
        throw error;
      }
      if (specificSlot.availability[0].status == true) {
        const error: CustomError = new Error(MessageError.AlreadyBooked);
        error.statusCode = HttpStatusCode.BadRequest;
        throw error;
      }
      let url;
      if (file) {
        const key = `Appointment/image${Date.now()}-${file.originalname}`;
        await this.s3Service.uploadFile(file, key);
        url = await this.s3Service.fetchFile(key);
      }
      const convenienceFee = Math.ceil(fee * 0.03);
      const subTotal = Number(convenienceFee) + Number(fee);
      console.log(subTotal, "is the subtotal");

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
          url
        );

      if (!createdAppointment) {
        const error: CustomError = new Error(
          MessageError.AppointmentCreationError
        );
        error.statusCode = HttpStatusCode.InternalServerError;
        throw error;
      }
      // const updateStatusInSlot =
      //   await this.UserLawyerRepository.updateStatusSlotBySpecifSlotId(
      //     slotId,
      //     specificSlotId,
      //     true
      //   );

      // if (!updateStatusInSlot) {
      //   const error: CustomError = new Error(
      //     MessageError.AppointmentCreationError
      //   );
      //   error.statusCode = HttpStatusCode.InternalServerError;
      //   throw error;
      // }

      return {
        statusCode: HttpStatusCode.Created,
        status: true,
        message: MessageError.AppointmentCreated,
        result: createdAppointment,
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
      const appointment = await this.AppointmentRepository.getAppointmentById(
        appointmentId
      );
      if (!appointment) {
        const error: CustomError = new Error(MessageError.AppointmentNotFound);
        error.statusCode = HttpStatusCode.NotFound;
        throw error;
      }
      console.log("Appointment:", appointment);
      appointment.lawyerId.profile_picture = await this.s3Service.fetchFile(
        appointment.lawyerId.profile_picture
      );
      // const updatedAppointments = await Promise.all(
      //   appointment.map(async (appointment) => {
      //     if (appointment.lawyerId && appointment.lawyerId.profile_picture) {
      //       appointment.lawyerId.profile_picture =
      //         await this.s3Service.fetchFile(
      //           appointment.lawyerId.profile_picture
      //         );
      //     }
      //     return appointment;
      //   })
      // );
      console.log("new apojddddddddddddddddddddddddddddddd");

      console.log(appointment);
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
  async createPayment(appointmentId: string): Promise<{
    statusCode: number;
    status: boolean;
    message: string;
    result: string | {};
  }> {
    try {
      console.log("hi");
      const appointment = await this.AppointmentRepository.getAppointmentById(
        appointmentId
      );
      console.log(
        appointment,
        "is the apointment ...................................................."
      );
      if (!appointment) {
        const error: CustomError = new Error(MessageError.AppointmentNotFound);
        error.statusCode = HttpStatusCode.NotFound;
        throw error;
      }
      const LawyerId = appointment.lawyerId._id;
      console.log(LawyerId, "is the laywer Id");
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
      console.log(
        validSlot,
        "is the valid slot 888888888888888888888888888888888888888888888888888888888888888"
      );
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
        console.log(
          newSpecifSlotId,
          "is sthe idshfihseoihfoisldjfiuiaeofsfo;ififius"
        );
        const newConvenienceFee = Math.ceil(newConsolationFee * 0.03);
        const subTotal = Number(newConvenienceFee) + Number(newConsolationFee);
        console.log(subTotal, "is the subtotal");
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
        console.log("in here status");
        const error: CustomError = new Error(MessageError.AlreadyBooked);
        error.statusCode = HttpStatusCode.BadRequest;
        throw error;
      }

      const options = {
        amount: appointment.subTotal * 100,
        currency: "INR",
        receipt: appointmentId,
        // notes: {
        //   appointmentId: appointmentId,
        //   lawyerId: appointment.lawyerId.toString(),
        //   userId: appointment.userId.toString()
        // }
      };

      const order = await razorpayInstance.orders.create(options);
      console.log("order:", order);
      return {
        statusCode: 200,
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
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
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
      console.log(razorpay_order_id);
      const updatedAppointment =
        await this.AppointmentRepository.updateAppointmentStatus(
          appointmentId,
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

      return {
        statusCode: HttpStatusCode.Created,
        status: true,
        message: MessageError.PaymentSuccessFull,
        result: updatedAppointment,
      };
    } catch (error) {
      throw error;
    }
  }
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
      console.log(totalLawyers, "is the total ");
      const totalPages = Math.ceil(totalLawyers / limit);
      console.log(totalPages, "is the total pages");

      // console.log("Appointment:", appointments);

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
}

export default UserAppointmentInteractor;
