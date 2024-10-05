import { IUser } from "../imodels/Iuser";
import IUserResult from "../imodels/IUserResult";

interface IAdminInteractor {
  adminLogin(
    user: IUser
  ): Promise<{ status: boolean; message: string; result: IUserResult | null }>;
  getUsers(): Promise<{
    status: boolean;
    message: string;
    result: [];
  }>;
  getPendingApprovalLawyers(): Promise<{
    statusCode: number;
    status: boolean;
    message: string;
    result: [];
  }>;
  getLawyer(id: string): Promise<{
    statusCode: number;
    status: boolean;
    message: string;
    result: [];
  }>;
  verifyLawyer(id: string): Promise<{
    statusCode: number;
    status: boolean;
    message: string;
    result: [];
  }>;
  unverifyLawyer(
    id: string,
    reason: string
  ): Promise<{
    statusCode: number;
    status: boolean;
    message: string;
    result: [];
  }>;
}

export default IAdminInteractor;
