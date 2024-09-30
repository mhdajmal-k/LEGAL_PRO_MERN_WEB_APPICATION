import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  S3ServiceException,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { config } from "./envConfig";
import { IS3Service } from "../../domain/services/Is3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export class S3Service implements IS3Service {
  private s3: S3Client;

  constructor() {
    this.s3 = new S3Client({
      credentials: {
        accessKeyId: config.S3ACCESS_KEY as string,
        secretAccessKey: config.S3SECRET_ACCESS_KEY as string,
      },
      region: config.BUCKET_REGION,
    });
  }

  async uploadFile(file: Express.Multer.File, key: string): Promise<string> {
    const params = {
      Bucket: config.BUCKET_NAME,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    try {
      const command = new PutObjectCommand(params);
      await this.s3.send(command);
      return `https://${config.BUCKET_NAME}.s3.${config.BUCKET_REGION}.amazonaws.com/${key}`;
    } catch (error) {
      throw error;
    }
  }
  async fetchFile(key: string): Promise<string> {
    try {
      const command = new GetObjectCommand({
        Bucket: config.BUCKET_NAME,
        Key: key,
      });
      const signedUrl = await getSignedUrl(this.s3, command, {
        expiresIn: 3600,
      });
      return signedUrl;
    } catch (error) {
      if (error instanceof S3ServiceException) {
        console.error(`S3 fetch error: ${error.message}`);
        throw new Error("Failed to fetch file from S3");
      }
      throw error;
    }
  }
  async deleteFile(key: string): Promise<any> {
    try {
      const command = new DeleteObjectCommand({
        Bucket: config.BUCKET_NAME,
        Key: key,
      });
      await this.s3.send(command);
      return true;
    } catch (error) {
      if (error instanceof S3ServiceException) {
        console.error(`S3 delete error: ${error.message}`);
        throw new Error("Failed to delete file from S3");
      }
      throw error;
    }
  }
}
