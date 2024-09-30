export interface IS3Service {
  uploadFile(file: Express.Multer.File, key: string): Promise<string>;
  fetchFile(file: string): Promise<string>;
}
