import { NextFunction, Request, Response } from "express";
import { CustomError } from "../../../frameWorks/middleware/errorHandiler";
import IUsersLawyerInteractor from "../../../domain/entites/iuseCase/IUserLawyerList";
import mongoose from "mongoose";
import { LawyerQuery } from "../../../domain/entites/imodels/iLawyer";

class UserLawyerController {
  constructor(private UserLawyerInteractor: IUsersLawyerInteractor) {}

  async getVerifiedLawyers(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      console.log(req.query, "is the qurey");
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
      console.log(query);
      const response = await this.UserLawyerInteractor.getVerifiedLawyers(
        Number(page),
        Number(limit),
        query
      );

      const lawyers = response.result;
      const totalPages = response.totalPages;
      return res.status(200).json({
        status: response.status,
        message: response.message,
        result: { lawyers, totalPages },
      });
    } catch (error) {
      next(error);
    }
  }
  async getLawyerById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      let { id } = req.params;
      if (!id) {
        return res.status(400).json({
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
  async lawyerSlot(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      let { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
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
}
export default UserLawyerController;