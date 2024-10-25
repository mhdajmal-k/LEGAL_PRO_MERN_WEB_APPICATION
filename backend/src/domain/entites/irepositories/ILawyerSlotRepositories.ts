interface ILawyerSlotRepository {
  createNewSlot(
    id: string,
    date: Date | string,
    feeAmount: number,
    availability: { timeSlot: string; fee: number }[]
  ): Promise<any>;
  findSlot(id: string): Promise<any>;
  deleteSlot(id: string): Promise<any>;
  updateSlot(
    slotId: string,
    // availability: string[],
    feeAmount: number,
    availability: { timeSlot: string; fee: number }[]
  ): Promise<any>;
}
export default ILawyerSlotRepository;
