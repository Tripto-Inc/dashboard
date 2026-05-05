'use server';

import { s3Client } from '@/lib/s3';
import { minioClient } from '@/lib/minio';
import { DeleteObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { DOCUMENT_ERRORS } from '../constants';
import { DeleteDocumentParams, UploadDocumentParams } from '../types';

export const uploadDocument = async ({
  bucket,
  object,
  file,
}: UploadDocumentParams) => {
  if (!bucket) throw new Error(DOCUMENT_ERRORS.BUCKET_REQUIRED);
  if (!object) throw new Error(DOCUMENT_ERRORS.OBJECT_REQUIRED);
  if (!file) throw new Error(DOCUMENT_ERRORS.FILE_REQUIRED);

  const provider = process.env.STORAGE_PROVIDER;

  if (!provider) {
    throw new Error('STORAGE_PROVIDER is not defined');
  }

  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // -------------------------
    // MINIO (stream-based)
    // -------------------------
    if (provider === 'minio') {
      await minioClient.putObject(bucket, object, buffer, buffer.length, {
        'Content-Type': file.type || 'application/octet-stream',
      });

      return { success: true };
    }

    // -------------------------
    // S3 (AWS / Supabase S3)
    // -------------------------
    if (provider === 's3') {
      await s3Client.send(
        new PutObjectCommand({
          Bucket: bucket,
          Key: object,
          Body: buffer,
          ContentType: file.type || 'application/octet-stream',
        })
      );

      return { success: true };
    }

    throw new Error(`Unsupported storage provider: ${provider}`);
  } catch (err) {
    throw err instanceof Error
      ? err
      : new Error('Unexpected storage error', { cause: err });
  }
};

export const deleteDocument = async ({
  bucket,
  object,
}: DeleteDocumentParams) => {
  if (!bucket) throw new Error(DOCUMENT_ERRORS.BUCKET_REQUIRED);
  if (!object) throw new Error(DOCUMENT_ERRORS.OBJECT_REQUIRED);

  const provider = process.env.STORAGE_PROVIDER;

  if (!provider) {
    throw new Error('STORAGE_PROVIDER is not defined');
  }

  try {
    // -------------------------
    // MINIO (stream-based)
    // -------------------------
    if (provider === 'minio') {
      await minioClient.removeObject(bucket, object);
      return { success: true };
    }

    // -------------------------
    // S3 (AWS / Supabase S3)
    // -------------------------
    if (provider === 's3') {
      await s3Client.send(
        new DeleteObjectCommand({
          Bucket: bucket,
          Key: object,
        })
      );

      return { success: true };
    }

    throw new Error(`Unsupported storage provider: ${provider}`);
  } catch (err) {
    throw err instanceof Error
      ? err
      : new Error('Unexpected storage error', { cause: err });
  }
};