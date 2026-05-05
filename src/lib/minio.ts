import { Client } from 'minio';

export const minioClient = new Client({
  endPoint: process.env.STORAGE_MINIO_ENDPOINT!,
  port: Number(process.env.STORAGE_MINIO_PORT!),
  accessKey: process.env.STORAGE_MINIO_USER!,
  secretKey: process.env.STORAGE_MINIO_PASSWORD!,
});
