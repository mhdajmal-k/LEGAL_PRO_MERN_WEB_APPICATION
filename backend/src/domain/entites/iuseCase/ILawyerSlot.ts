interface ILawyerSlotInteractor {
  createSlot(
    id: string,
    date: Date | string,
    feeAmount: number,
    availability: string[]
  ): Promise<{
    statusCode: number;
    status: boolean;
    message: string;
    result: string | {};
  }>;
  getLawyerSlot(id: string): Promise<{
    statusCode: number;
    status: boolean;
    message: string;
    result: string | {};
  }>;
  updateSlot(
    slotId: string,
    feeAmount: number,
    availability: string[]
  ): Promise<{
    statusCode: number;
    status: boolean;
    message: string;
    result: string | {};
  }>;
}
export default ILawyerSlotInteractor;
