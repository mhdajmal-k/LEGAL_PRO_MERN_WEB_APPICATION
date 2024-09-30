import { Request, Response, NextFunction } from "express";
import ILawyerAuthInteractor from "../../../domain/entites/iuseCase/iLawyerAuth";
import { validateLawyerInput } from "../../../frameWorks/utils/helpers/validationHelpers";
class LawyerAuthController {
  constructor(private lawyerAuthInteractor: ILawyerAuthInteractor) {}
  async lawyerSignUp(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const data = req.body;
      const file = req.file;

      const validateDataError = validateLawyerInput(data);
      if (validateDataError) {
        res
          .status(400)
          .json({ status: false, message: validateDataError, result: {} });
        return;
      }
      if (!file) {
        res
          .status(400)
          .json({
            status: false,
            message: "profile image is required",
            result: {},
          });
        return;
      }

      const response = await this.lawyerAuthInteractor.lawyerSingUp(data, file);

      res.status(response.statusCode).json({
        status: true,
        message: response.message,
        result: response.result,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default LawyerAuthController;
