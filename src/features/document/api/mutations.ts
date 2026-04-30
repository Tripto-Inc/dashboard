'use server';

import { minioClient } from '@/lib/minio';
import { DOCUMENT_ERRORS } from '../constants';
import { DeleteDocumentParams, UploadDocumentParams } from '../types';

export const uploadDocument = async ({ bucket, object, file }: UploadDocumentParams) => {
  if (!bucket) throw new Error(DOCUMENT_ERRORS.BUCKET_REQUIRED);
  if (!object) throw new Error(DOCUMENT_ERRORS.OBJECT_REQUIRED);
  if (!file) throw new Error(DOCUMENT_ERRORS.FILE_REQUIRED);

  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    await minioClient.putObject(bucket, object, buffer, buffer.length, {
      'Content-Type': file.type || 'application/octet-stream',
    });

    return {
      success: true,
    };
  } catch (err) {
    const error = err as Error & { code?: string; statusCode?: number };

    const errorMap: Record<string, { message: string; statusCode: number }> = {
      NoSuchBucket: { message: 'Bucket not found', statusCode: 404 },
      AccessDenied: { message: 'Access denied', statusCode: 403 },
      InvalidBucketName: { message: 'Invalid bucket name', statusCode: 400 },
      InvalidObjectName: { message: 'Invalid object name', statusCode: 400 },
      SignatureDoesNotMatch: { message: 'Authentication failed', statusCode: 401 },
      EntityTooLarge: { message: 'File is too large', statusCode: 413 },
      SlowDown: { message: 'Too many requests', statusCode: 429 },
      InternalError: { message: 'Storage internal error', statusCode: 500 },
    };

    const mapped = error.code ? errorMap[error.code] : undefined;

    throw new Error(mapped?.message || error.message || 'Unexpected storage error');
  }
};

export const deleteDocument = async (params: DeleteDocumentParams) => {
  const { bucket, object } = params;

  if (!bucket) throw new Error(DOCUMENT_ERRORS.BUCKET_REQUIRED);
  if (!object) throw new Error(DOCUMENT_ERRORS.OBJECT_REQUIRED);

  minioClient.statObject(bucket, object);
  minioClient.removeObject(bucket, object);
};
