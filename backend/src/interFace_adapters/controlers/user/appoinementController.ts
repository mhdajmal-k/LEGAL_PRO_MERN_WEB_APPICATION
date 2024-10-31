import { NextFunction, Request, Response } from "express";
import {
  HttpStatusCode,
  MessageError,
} from "../../../frameWorks/utils/helpers/Enums";
import IUserAppointmentInteractor from "../../../domain/entites/iuseCase/iUserAppointment";
import { AuthenticatedRequest } from "../../../domain/entites/imodels/iLawyer";

class AppointmentController {
  constructor(private UserAppointmentInteractor: IUserAppointmentInteractor) {}

  async createAppointment(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      console.log("hi form the contorler");
      const userIdFromToken = req.user?.id;
      console.log(userIdFromToken, "is user userIdFromToken");
      console.log(req.body);
      const {
        lawyerId,
        slotId,
        appointmentDate,
        appointmentTime,
        consultationFee,
        specificSlotId,
        userId,
        description,
      } = req.body;

      const file = req.file ?? null;
      console.log(file, "is the image file");
      if (userIdFromToken !== userId) {
        console.log("hi");
        return res.status(HttpStatusCode.Forbidden).json({
          status: false,
          message: MessageError.Unauthorized,
          result: {},
        });
      }
      if (
        !lawyerId ||
        !slotId ||
        !appointmentDate ||
        !appointmentTime ||
        !consultationFee ||
        !specificSlotId ||
        !description
      ) {
        return res.status(HttpStatusCode.BadRequest).json({
          status: false,
          message: MessageError.DadRequest,
          result: {},
        });
      }

      const response = await this.UserAppointmentInteractor.createAppointment(
        lawyerId,
        slotId,
        consultationFee,
        specificSlotId,
        appointmentTime,
        appointmentDate,
        description,
        userId,
        file
      );
      if (response.status) {
        return res.status(response.statusCode).json({
          status: response.status,
          message: response.message,
          result: response.result,
        });
      }
    } catch (error) {
      next(error); // Pass the error to the error handler
    }
  }

  async getAppointment(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      console.log("in here");
      const { appointmentId } = req.params;

      if (!appointmentId) {
        console.log("checking..");
        return res.status(HttpStatusCode.BadRequest).json({
          status: false,
          message: MessageError.BadPrams,
          result: {},
        });
      }
      const response = await this.UserAppointmentInteractor.getAppointment(
        appointmentId
      );
      if (response.status) {
        return res.status(response.statusCode).json({
          status: response.status,
          message: response.message,
          result: response.result,
        });
      }
    } catch (error) {
      next(error);
    }
  }
  async getAllAppointmentBasedStatus(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      console.log("called");
      console.log(req.query);
      const { status } = req.query;
      const currentPage = req.query.page ? req.query.page : 1;
      const limit = req.query.limit ? req.query.limit : 5;
      console.log(currentPage);
      console.log(limit);
      const userIdFromToken = req.user?.id;
      const filter = status ?? "Pending";
      const response =
        await this.UserAppointmentInteractor.getAllAppointmentBasedStatus(
          filter as string,
          userIdFromToken as string,
          Number(currentPage),
          Number(limit)
        );
      if (response.status) {
        const appointment = response.result;
        console.log(appointment);
        const totalPages = response.totalPages;
        return res.status(response.statusCode).json({
          status: response.status,
          message: response.message,
          result: { appointment, totalPages },
        });
      }
    } catch (error) {
      next(error);
    }
  }
  async createPayment(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      console.log("in here the controller");
      const { appointmentId } = req.body;
      if (!appointmentId) {
        return res.status(HttpStatusCode.BadRequest).json({
          status: false,
          message: MessageError.BadPrams,
          result: {},
        });
      }
      const response = await this.UserAppointmentInteractor.createPayment(
        appointmentId
      );
      if (response.status) {
        return res.status(response.statusCode).json({
          status: response.status,
          message: response.message,
          result: response.result,
        });
      }
    } catch (error) {
      next(error);
    }
  }
  async verifyPayment(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      console.log("in here the controller verify");
      console.log(req.body);
      const {
        razorpay_payment_id,
        razorpay_order_id,
        razorpay_signature,
        appointmentId,
      } = req.body;
      if (
        !razorpay_payment_id ||
        !razorpay_order_id ||
        !razorpay_signature ||
        !appointmentId
      ) {
        return res.status(HttpStatusCode.BadRequest).json({
          status: false,
          message: MessageError.BadPrams,
          result: {},
        });
      }
      const response =
        await this.UserAppointmentInteractor.verifyRazorPayPayment(
          razorpay_order_id,
          razorpay_payment_id,
          razorpay_signature,
          appointmentId
        );
      if (response.status) {
        return res.status(response.statusCode).json({
          status: response.status,
          message: response.message,
          result: response.result,
        });
      }
    } catch (error) {
      next(error);
    }
  }
  async cancelAppointment(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { appointmentId } = req.params;

      if (!appointmentId) {
        console.log("checking..");
        return res.status(HttpStatusCode.BadRequest).json({
          status: false,
          message: MessageError.BadPrams,
          result: {},
        });
      }

      const response =
        await this.UserAppointmentInteractor.cancellingAppointment(
          appointmentId
        );
      if (response.status) {
        return res.status(response.statusCode).json({
          status: response.status,
          message: response.message,
          result: response.result,
        });
      }
    } catch (error) {
      next(error);
    }
  }
  async checkRefundStatus(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      console.log("hi");
      const { appointmentId } = req.params;

      if (!appointmentId) {
        return res.status(HttpStatusCode.BadRequest).json({
          status: false,
          message: MessageError.BadPrams,
          result: {},
        });
      }
      const response =
        await this.UserAppointmentInteractor.getCancelledRefundStatus(
          appointmentId
        );
      if (response.status) {
        return res.status(response.statusCode).json({
          status: response.status,
          message: response.message,
          result: response.result,
        });
      }
    } catch (error) {
      next(error);
    }
  }
}

export default AppointmentController;
