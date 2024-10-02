import { NextFunction, Request, Response } from "express";
import IAdminInteractor from "../../../domain/entites/iuseCase/iadmin";
import { corsOptions } from "../../../frameWorks/config/corsConfig";

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
      if (response.status) {
        res.cookie("AdminAuth_token", response.result, {
          httpOnly: true,
          sameSite: "strict",
          maxAge: 5 * 60 * 1000,
        });

        res.status(200).json({
          status: response.status,
          message: response.message,
          result: {},
        });
      }
    } catch (error) {
      next(error);
    }
  }
}

export default AdminController;
