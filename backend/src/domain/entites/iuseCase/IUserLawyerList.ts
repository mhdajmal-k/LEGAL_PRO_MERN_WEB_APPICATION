import { IUser } from "../../../domain/entites/imodels/Iuser";
import { ILawyer, LawyerQuery } from "../imodels/iLawyer";
import { IProfileUpdateData, IUpdateResponse } from "../imodels/iUserProfle";

interface IUsersLawyerInteractor {
  getVerifiedLawyers(
    currentPage: number,
    limit: number,
    query: LawyerQuery
  ): Promise<{
    status: boolean;
    statusCode: number;
    message: string;
    result: {};
    totalPages?: number;
  }>;
  getLawyerById(id: string): Promise<IUpdateResponse<ILawyer>>;
  getLawyerslot(lawyerId: string): Promise<{
    statusCode: number;
    status: boolean;
    message: string;
    result: string | {};
  }>;
}
export default IUsersLawyerInteractor;
