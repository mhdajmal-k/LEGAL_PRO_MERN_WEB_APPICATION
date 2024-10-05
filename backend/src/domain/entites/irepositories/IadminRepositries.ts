import { Types } from "mongoose";
interface iAdminRepository {
  adminAlreadyExist(email: string, role: string): Promise<any>;
  createAdmin(data: any, role: string): Promise<any>;
  getUser(): Promise<any>;
  getPendingApprovalLawyers(): Promise<any>;
  getLawyer(id: string): Promise<any>;
  verifyLawyer(id: string): Promise<any>;
  unverifyLawyer(id: string): Promise<any>;
  blockorUnblock(id: string, blockState: boolean): Promise<any>;
}

export default iAdminRepository;
