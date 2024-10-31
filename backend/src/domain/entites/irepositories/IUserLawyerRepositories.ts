import { LawyerQuery } from "../imodels/iLawyer";

interface IUserLawyerRepository {
  getVerifiedLawyers(
    currentPage: number,
    limit: number,
    query: LawyerQuery
  ): Promise<any>;
  getLawyerById(id: string): Promise<any>;
  getTotalCountOfLawyers(db: string, query: LawyerQuery): Promise<any>;
  getLawyerSlots(id: string): Promise<any>;
  getSlotBySlotId(slotId: string): Promise<any>;
  getSlotBySpecifSlotId(slotId: string, specificSlotId: string): Promise<any>;
  updateStatusSlotBySpecifSlotId(
    slotId: string,
    specificSlotId: string,
    status: boolean
  ): Promise<any>;
}

export default IUserLawyerRepository;
