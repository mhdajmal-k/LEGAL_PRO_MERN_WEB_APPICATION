import { Types } from "mongoose";
import { ILawyer, IProfessionalData } from "../imodels/iLawyer";

interface iLawyerRepository {
  lawyerAlreadyExist(email: string): Promise<boolean>;
  createLawyer(data: ILawyer): Promise<any>;
  validLawyer(email: string): Promise<any>;
  getId(id: string): Promise<Types.ObjectId | null>;
<<<<<<< HEAD
  updatePassword(password: string, id: string): Promise<any>;
=======
>>>>>>> 1cb3bf3d1224596338a622879a6d01c174d4c611
  updateLawyerProfessionalData(
    data: IProfessionalData,
    id: string
  ): Promise<boolean>;
}

export default iLawyerRepository;
