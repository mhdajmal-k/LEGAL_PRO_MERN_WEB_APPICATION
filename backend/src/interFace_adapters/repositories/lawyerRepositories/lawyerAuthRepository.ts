import { Types } from "mongoose";
import { ILawyer } from "../../../domain/entites/imodels/iLawyer";
import iLawyerRepository from "../../../domain/entites/irepositories/ilawyerRepositories";
import Lawyer from "../../../frameWorks/database/models/lawyerModel";
import { hashPassword } from "../../../frameWorks/utils/helpers/passwordHelper";

class LawyerAuthRepository implements iLawyerRepository {
  async createLawyer(data: ILawyer): Promise<any> {
    try {
      const hashedPassword = hashPassword(data.password);
      const newUser = new Lawyer({
        userName: data.userName,
        email: data.email,
        password: hashedPassword,
        city: data.city,
        gender: data.gender,
        zipcode: data.zipcode,
        state: data.state,
        profile_picture: data.profile_picture,
      });
      try {
        await newUser.save();
        return newUser;
      } catch (error) {
        throw error;
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async validLawyer(email: string): Promise<any> {
    try {
<<<<<<< HEAD
=======
      console.log(email, "is the repo email");
>>>>>>> 1cb3bf3d1224596338a622879a6d01c174d4c611
      const lawyer = await Lawyer.findOne({ email: email }).lean();
      console.log(lawyer);
      return lawyer;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async lawyerAlreadyExist(email: string): Promise<boolean> {
<<<<<<< HEAD
    const lawyer = await Lawyer.findOne({
      $and: [{ email: email }, { verified: "verified" }],
    }).lean();
    return !!lawyer;
  }
  async getId(id: string): Promise<Types.ObjectId | null | any> {
=======
    const lawyer = await Lawyer.findOne({ email: email }).lean();
    return !!lawyer;
  }
  async getId(id: string): Promise<Types.ObjectId | null> {
>>>>>>> 1cb3bf3d1224596338a622879a6d01c174d4c611
    try {
      console.log(id, "is the id");
      const userId = await Lawyer.findById({ _id: id });
      return userId ? userId?.id : null;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async updateLawyerProfessionalData(data: any, id: string): Promise<boolean> {
    try {
<<<<<<< HEAD
      data.practiceArea = JSON.parse(data.practiceArea);
      data.languages = JSON.parse(data.languages);
=======
>>>>>>> 1cb3bf3d1224596338a622879a6d01c174d4c611
      const updateLawyer = await Lawyer.findByIdAndUpdate(
        { _id: id },
        {
          $set: {
            practice_area: data.practiceArea,
            certifications: data.certificate,
            years_of_experience: data.yearsOfExperience,
            languages_spoken: data.languages,
            designation: data.designation,
<<<<<<< HEAD
            about: data.aboutMe,
=======
            aboutMe: data.aboutMe,
>>>>>>> 1cb3bf3d1224596338a622879a6d01c174d4c611
          },
        },
        { new: true }
      );
      return updateLawyer ? true : false;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
<<<<<<< HEAD
  async updatePassword(password: string, id: string): Promise<any> {
    try {
      const hashedPassword = hashPassword(password);
      const updatedPasswordLawyer = await Lawyer.findByIdAndUpdate(
        { _id: id },
        {
          $set: { password: hashedPassword },
        },
        { new: true }
      );
      return updatedPasswordLawyer;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

=======
}
>>>>>>> 1cb3bf3d1224596338a622879a6d01c174d4c611
export default LawyerAuthRepository;
