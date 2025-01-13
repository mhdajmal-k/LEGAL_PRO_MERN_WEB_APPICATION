// import { IUser } from "../../../domain/entites/imodels/Iuser";
import { IBlog } from "../imodels/iBlog";
import { ILawyer, LawyerQuery } from "../imodels/iLawyer";
import { IReview } from "../imodels/iReview";
import { IUpdateResponse } from "../imodels/iUserProfle";

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
  topLawyersForRecommendation(): Promise<IUpdateResponse<ILawyer[]>>;
  getLawyerslot(lawyerId: string): Promise<{
    statusCode: number;
    status: boolean;
    message: string;
    result: string | {};
  }>;
  creatingLawyerReview(
    appointmentId: string,
    rating: number,
    review: string
  ): Promise<{
    statusCode: number;
    status: boolean;
    message: string;
    result: string | {};
  }>;
  getLawyerReview(
    lawyerId: string,
    currentPage: number,
    limit: number
  ): Promise<{
    statusCode: number;
    status: boolean;
    message: string;
    result: IReview[];
  }>;
  getBlogs(
    currentPage: number,
    limit: number
  ): Promise<{
    statusCode: number;
    status: boolean;
    message: string;
    result: IBlog[];
    hasMore: boolean
  }>;
}
export default IUsersLawyerInteractor;
