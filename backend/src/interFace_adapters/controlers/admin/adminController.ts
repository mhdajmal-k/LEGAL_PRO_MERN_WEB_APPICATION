import { NextFunction, Request, Response } from "express";
import IAdminInteractor from "../../../domain/entites/iuseCase/iadmin";
import { corsOptions } from "../../../frameWorks/config/corsConfig";
import {
  HttpStatusCode,
  MessageError,
} from "../../../frameWorks/utils/helpers/Enums";

class AdminController {
  constructor(private adminInteractor: IAdminInteractor) {}
  async adminLogin(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const data = req.body;
      if (data.email.trim() == "" || data.password.trim() == "") {
        res
          .status(400)
          .json({ status: false, message: "email and password is required" });
        return;
      }
      const response = await this.adminInteractor.adminLogin(data);

      if (response) {
        res.cookie("auth_adminAccessToken", response.result?.tokenJwt, {
          httpOnly: true,
          sameSite: "strict",
          maxAge: 60 * 60 * 1000,
        });

        res.status(200).json({
          status: response.status,
          message: response.message,
          result: response.result,
        });
      }
    } catch (error) {
      next(error);
    }
  }
  async getUsers(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const currentPage = req.query.page ? req.query.page : 1;
      const limit = req.query.limit ? req.query.limit : 5;
      const response = await this.adminInteractor.getUsers(
        Number(currentPage),
        Number(limit)
      );
      const users = response.result;
      const totalUsers = response.totalUsers;
      const totalPages = response.totalPages;
      if (response.result) {
        res.status(200).json({
          status: response.status,
          message: response.message,
          result: { users, totalUsers, totalPages },
        });
      }
    } catch (error) {
      next(error);
    }
  }

  async getPendingApprovalLawyer(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const response = await this.adminInteractor.getPendingApprovalLawyers();

      if (response.result) {
        res.status(response.statusCode).json({
          status: response.status,
          message: response.message,
          result: response.result,
        });
      }
    } catch (error) {
      next(error);
    }
  }

  async getLawyers(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const currentPage = req.query.page ? req.query.page : 1;
      const limit = req.query.limit ? req.query.limit : 5;
      const response = await this.adminInteractor.getLawyersList(
        Number(currentPage),
        Number(limit)
      );
      if (response.result) {
        const lawyers = response.result;
        const totalUsers = response.totalUsers;
        const totalPages = response.totalPages;
        res.status(response.statusCode).json({
          status: response.status,
          message: response.message,
          result: { lawyers, totalUsers, totalPages },
        });
      }
    } catch (error) {
      next(error);
    }
  }

  async lawyer(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id: string = req.params.id;
      const response = await this.adminInteractor.getLawyer(id);

      if (response.result) {
        res.status(200).json({
          status: response.status,
          message: response.message,
          result: response.result,
        });
      }
    } catch (error) {
      next(error);
    }
  }
  async updateLawyer(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id: string = req.params.id;
      const response = await this.adminInteractor.verifyLawyer(id);
      if (response.result) {
        res.status(200).json({
          status: response.status,
          message: response.message,
          result: response.result,
        });
      }
    } catch (error) {
      next(error);
    }
  }
  async unVerifyLawyer(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id: string = req.params.id;
      const { reason } = req.body;
      const response = await this.adminInteractor.unverifyLawyer(id, reason);
      if (response.result) {
        res.status(response.statusCode).json({
          status: response.status,
          message: response.message,
          result: response.result,
        });
      }
    } catch (error) {
      next(error);
    }
  }
  async blockOrUnblock(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id: string = req.params.id;

      const { state, action } = req.body;
      const response = await this.adminInteractor.blockandUnblock(
        id,
        state,
        action
      );

      if (response.result) {
        res.status(response.statusCode).json({
          status: response.status,
          message: response.message,
          result: {},
        });
      }
    } catch (error) {
      next(error);
    }
  }
  async getAllAppointments(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { status } = req.query;
      const currentPage = req.query.page ? req.query.page : 1;
      const limit = req.query.limit ? req.query.limit : 5;

      const filter = status ?? "Pending";
      const response = await this.adminInteractor.allAppointments(
        filter as string,
        Number(currentPage),
        Number(limit)
      );
      if (response.result) {
        const appointment = response.result;
        const totalPages = response.totalPages;

        res.status(response.statusCode).json({
          status: response.status,
          message: response.message,
          result: { appointment, totalPages },
        });
      }
    } catch (error) {
      next(error);
    }
  }
  async getAppointmentData(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { appointmentId } = req.params;

      if (!appointmentId) {
        return res.status(HttpStatusCode.BadRequest).json({
          status: false,
          message: MessageError.BadPrams,
          result: {},
        });
      }
      const response = await this.adminInteractor.getAppointment(appointmentId);
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

  async adminLogOut(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      console.log("in logout");
      res.clearCookie("auth_adminAccessToken");
      res.status(200).json({ message: "Logout successful", status: true });
    } catch (error) {
      next(error);
    }
  }
}
export default AdminController;
