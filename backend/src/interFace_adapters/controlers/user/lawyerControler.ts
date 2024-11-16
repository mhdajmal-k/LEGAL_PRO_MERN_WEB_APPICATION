import { NextFunction, Request, Response } from "express";
import { CustomError } from "../../../frameWorks/middleware/errorHandiler";
import IUsersLawyerInteractor from "../../../domain/entites/iuseCase/IUserLawyerList";
import mongoose from "mongoose";
import { LawyerQuery } from "../../../domain/entites/imodels/iLawyer";
import {
  HttpStatusCode,
  MessageError,
} from "../../../frameWorks/utils/helpers/Enums";

class UserLawyerController {
  constructor(private UserLawyerInteractor: IUsersLawyerInteractor) {}

  ///////////////////

  async getVerifiedLawyers(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const {
        searchText,
        experience,
        gender,
        languagesSpoken,
        designation,
        city,
        courtPracticeArea,
        page = 1,
        limit = 5,
      } = req.query;
      console.log(searchText);
      const query: LawyerQuery = {
        verified: "verified",
      };

      if (searchText) {
        query.$or = [
          { practice_area: { $regex: String(searchText), $options: "i" } },
          { userName: { $regex: String(searchText), $options: "i" } },
        ];
      }

      if (experience) {
        query.years_of_experience = { $gte: String(experience) };
      }
      if (gender) {
        query.gender = { $regex: String(gender), $options: "i" };
      }
      if (city) {
        query.city = { $regex: String(city), $options: "i" };
      }
      if (designation) {
        query.designation = { $regex: String(designation), $options: "i" };
      }
      if (courtPracticeArea) {
        query.courtPracticeArea = {
          $regex: String(courtPracticeArea),
          $options: "i",
        };
      }
      if (languagesSpoken) {
        const languageArray = Array.isArray(languagesSpoken)
          ? languagesSpoken.map(String)
          : [String(languagesSpoken)];

        query.languages_spoken = {
          $in: languageArray,
        };
      }
      const response = await this.UserLawyerInteractor.getVerifiedLawyers(
        Number(page),
        Number(limit),
        query
      );
      const lawyers = response.result;
      const totalPages = response.totalPages;
      return res.status(HttpStatusCode.OK).json({
        status: response.status,
        message: response.message,
        result: { lawyers, totalPages },
      });
    } catch (error) {
      next(error);
    }
  }

  ///////////////////////

  async getLawyerById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      let { id } = req.params;
      if (!id) {
        return res.status(HttpStatusCode.BadRequest).json({
          status: false,
          message: "invalid Id",
        });
      }
      const response = await this.UserLawyerInteractor.getLawyerById(id);
      console.log(response);
      if (response.status) {
        return res.status(response.statusCode).json({
          status: response.status,
          message: "Lawyer got successFully",
          result: response.result,
        });
      }
    } catch (error) {
      next(error);
    }
  }

  /////////////

  async lawyerSlot(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      let { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(HttpStatusCode.OK).json({
          status: false,
          message: "invalid Lawyer Id ",
          result: {},
        });
      }
      const response = await this.UserLawyerInteractor.getLawyerslot(id);
      console.log(response);
      if (response.status) {
        return res.status(response.statusCode).json({
          status: response.status,
          message: "Lawyer got successFully",
          result: response.result,
        });
      }
    } catch (error) {
      next(error);
    }
  }
  async createReview(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      let { id } = req.params;
      console.log(id, "is the params");
      let { rating, review } = req.body;
      if (!id) {
        return res.status(HttpStatusCode.OK).json({
          status: false,
          message: MessageError.BadPrams,
          result: {},
        });
      }
      const response = await this.UserLawyerInteractor.creatingLawyerReview(
        id,
        rating,
        review
      );
      res.status(response.statusCode).json({
        status: response.status,
        message: response.message,
        result: response.result,
      });
    } catch (error) {
      next(error);
    }
  }
  async getReviews(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      console.log("hi in the getReviews");
      let { id } = req.params;

      const { page = 1, limit = 10 } = req.query;
      if (!id) {
        return res.status(HttpStatusCode.OK).json({
          status: false,
          message: MessageError.BadPrams,
          result: {},
        });
      }
      const response = await this.UserLawyerInteractor.getLawyerReview(
        id,
        Number(String(page)),
        Number(String(limit))
      );
      console.log(response, "in the revewis ");
      res.status(response.statusCode).json({
        status: response.status,
        message: response.message,
        result: response.result,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default UserLawyerController;
