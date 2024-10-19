interface IUserLawyerRepository {
  getVerifiedLawyers(): Promise<any>;
  getLawyerById(id: string): Promise<any>;
}
export default IUserLawyerRepository;
