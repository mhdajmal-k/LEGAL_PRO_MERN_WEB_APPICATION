import { LawyerQuery } from "../imodels/iLawyer";
import { IReview } from "../imodels/iReview";

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
  createRating(
    lawyerId: string,
    userId: string,
    rating: number,
    review: string
  ): Promise<any>;
  getReview(
    lawyerId: string,
    currentPage: number,
    limit: number
  ): Promise<IReview[]>;
}

export default IUserLawyerRepository;
