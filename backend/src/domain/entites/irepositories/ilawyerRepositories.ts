import { Types } from "mongoose";
import { ILawyer, IProfessionalData } from "../imodels/iLawyer";

interface iLawyerRepository {
  lawyerAlreadyExist(email: string): Promise<boolean>;
  createLawyer(data: ILawyer): Promise<any>;
  validLawyer(email: string): Promise<any>;
  getId(id: string): Promise<Types.ObjectId | null>;

  updatePassword(password: string, id: string): Promise<any>;

  updateLawyerProfessionalData(
    data: IProfessionalData,
    id: string
  ): Promise<boolean>;
}

export default iLawyerRepository;
