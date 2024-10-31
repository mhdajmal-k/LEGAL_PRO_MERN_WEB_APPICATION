import { IAppointmentAdminSide } from "../imodels/iAppontment";
import { IUser } from "../imodels/Iuser";
import IUserResult from "../imodels/IUserResult";

interface IAdminInteractor {
  adminLogin(
    user: IUser
  ): Promise<{ status: boolean; message: string; result: IUserResult | null }>;
  getUsers(
    currentPage: number,
    limit: number
  ): Promise<{
    status: boolean;
    message: string;
    result: [];
    totalUsers?: number;
    totalPages?: number;
  }>;
  getPendingApprovalLawyers(): Promise<{
    statusCode: number;
    status: boolean;
    message: string;
    result: [];
  }>;

  getLawyersList(
    currentPage: number,
    limit: number
  ): Promise<{
    statusCode: number;
    status: boolean;
    message: string;
    result: any[];
    totalUsers?: number;
    totalPages?: number;
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
  blockandUnblock(
    id: string,
    state: boolean,
    action: string
  ): Promise<{
    statusCode: number;
    status: boolean;
    message: string;
    result: [];
  }>;
  allAppointments(
    status: string,
    currentPage: number,
    limit: number
  ): Promise<{
    statusCode: number;
    status: boolean;
    message: string;
    result: IAppointmentAdminSide[];
    totalPages?: number;
  }>;
  getAppointment(appointmentId: string): Promise<{
    statusCode: number;
    status: boolean;
    message: string;
    result: string | {};
  }>;
}

export default IAdminInteractor;
