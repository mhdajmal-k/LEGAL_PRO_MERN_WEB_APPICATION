interface IProfileUpdateData {
  email: string;
  userName: string;
  id: string;
  phoneNumber?: string;
  file?: string;
}
interface IUpdateResponse<T> {
  status: boolean;
  message: string;
  result: T | null;
  statusCode: number;
}
export { IProfileUpdateData, IUpdateResponse };
