import { Request, Response, NextFunction } from "express";
import ILawyerAppointmentInteractor from "../../../domain/entites/iuseCase/ILawyerAppointment";
import { AuthenticatedRequest } from "../../../domain/entites/imodels/iLawyer";
import {
  HttpStatusCode,
  MessageError,
} from "../../../frameWorks/utils/helpers/Enums";

class LawyerAppointmentController {
  constructor(
    private lawyerAppointmentInteractor: ILawyerAppointmentInteractor
  ) {}

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

      const lawyerIdFromToken = req.user?.id;
      const filter = status ?? "Pending";
      const response =
        await this.lawyerAppointmentInteractor.getAllAppointmentBasedStatus(
          filter as string,
          lawyerIdFromToken as string,
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
      const response = await this.lawyerAppointmentInteractor.getAppointment(
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
      console.log("in here");
      const { appointmentId } = req.params;

      if (!appointmentId) {
        return res.status(HttpStatusCode.BadRequest).json({
          status: false,
          message: MessageError.BadPrams,
          result: {},
        });
      }
      const response =
        await this.lawyerAppointmentInteractor.cancellingAppointment(
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

export default LawyerAppointmentController;
