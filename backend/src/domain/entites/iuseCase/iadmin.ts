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
<<<<<<< HEAD
  getLawyersList(): Promise<{
    statusCode: number;
    status: boolean;
    message: string;
    result: any[];
  }>;
=======
>>>>>>> 1cb3bf3d1224596338a622879a6d01c174d4c611
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
  blockandUnblock(
    id: string,
<<<<<<< HEAD
    state: boolean,
    action: string
=======
    state: boolean
>>>>>>> 1cb3bf3d1224596338a622879a6d01c174d4c611
  ): Promise<{
    statusCode: number;
    status: boolean;
    message: string;
    result: [];
  }>;
}

export default IAdminInteractor;
