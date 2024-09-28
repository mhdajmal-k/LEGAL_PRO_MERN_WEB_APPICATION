import { ILawyer } from "../imodels/iLawyer";

interface iLawyerRepository {
  lawyerAlreadyExist(email: string): Promise<boolean>;
  createLawyer(data: ILawyer): Promise<any>;
  validLayer(email: string): Promise<any>;
}

export default iLawyerRepository;
