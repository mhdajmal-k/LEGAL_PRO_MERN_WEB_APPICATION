interface ILawyerSlotRepository {
  createNewSlot(
    id: string,
    date: Date | string,
    feeAmount: number,
    availability: string[]
  ): Promise<any>;
  findSlot(id: string): Promise<any>;
  updateSlot(
    slotId: string,
    availability: string[],
    feeAmount: number
  ): Promise<any>;
}
export default ILawyerSlotRepository;
