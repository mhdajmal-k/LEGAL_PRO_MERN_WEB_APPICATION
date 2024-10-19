import { IUser } from "../../../domain/entites/imodels/Iuser";
import { ILawyer } from "../imodels/iLawyer";
import { IProfileUpdateData, IUpdateResponse } from "../imodels/iUserProfle";

interface IUsersLawyerInteractor {
  getVerifiedLawyers(): Promise<IUpdateResponse<IUser>>;
  getLawyerById(id: string): Promise<IUpdateResponse<ILawyer>>;
}
export default IUsersLawyerInteractor;
