import { Types } from "mongoose";
interface iAdminRepository {
  adminAlreadyExist(email: string, role: string): Promise<any>;
  createAdmin(data: any, role: string): Promise<any>;
  getUser(): Promise<any>;
  getPendingApprovalLawyers(): Promise<any>;
  getLawyer(id: string): Promise<any>;
  getLawyers(): Promise<any>;
  getAdmin(id: string): Promise<any>;
  verifyLawyer(id: string): Promise<any>;
  unverifyLawyer(id: string): Promise<any>;
  blockorUnblock(id: string, blockState: boolean, action: string): Promise<any>;

  //   getAdmin(id: string): Promise<any>;
  //   verifyLawyer(id: string): Promise<any>;
  //   unverifyLawyer(id: string): Promise<any>;
  //   blockorUnblock(id: string, blockState: boolean): Promise<any>;
  // >>>>>>> 1cb3bf3d1224596338a622879a6d01c174d4c611
}

export default iAdminRepository;
