import { Request, Response } from "express";
import IUserAuthInteractor from "../../../domain/entites/iuseCase/iAuth";

class UserAuthController {
  constructor(private userAuthInteractor: IUserAuthInteractor) {}

  async signUp(req: Request, res: Response): Promise<any> {
    try {
      const data = req.body;
      const response = await this.userAuthInteractor.userSingUp(data);

      if (response.status) {
        //
        res.cookie("auth_token", response.result, {
          httpOnly: true,
          sameSite: "strict",
          maxAge: 5 * 60 * 1000,
        });

        return res.status(200).json({
          success: true,
          message: response.message,
          result: {},
        });
      } else {
        return res.status(400).json({
          success: false,
          message: response.message,
          result: {},
        });
      }
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message || "Internal Server Error",
        result: {},
      });
    }
  }
}

export default UserAuthController;
