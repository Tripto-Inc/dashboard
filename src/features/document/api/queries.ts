'use server';

import { minioClient } from '@/lib/minio';
import { DOCUMENT_ERRORS } from '../constants';
import {
  GetDocumentParams,
  GetDocumentResponse,
  GetDocumentsParams,
  GetDocumentsResponse,
} from '../types';

export const getDocument = async (params: GetDocumentParams): Promise<GetDocumentResponse> => {
  const { bucket, object } = params;

  if (!bucket) throw new Error(DOCUMENT_ERRORS.BUCKET_REQUIRED);
  if (!object) throw new Error(DOCUMENT_ERRORS.OBJECT_REQUIRED);

  try {
    await minioClient.statObject(bucket, object);
    const url = await minioClient.presignedGetObject(bucket, object);

    return { url };
  } catch (err) {
    const error = err as Error & { code?: string; statusCode?: number };

    const errorMap: Record<string, { message: string; statusCode: number }> = {
      NotFound: { message: 'File not found', statusCode: 404 },
      NoSuchKey: { message: 'File not found', statusCode: 404 },
      NoSuchBucket: { message: 'Bucket not found', statusCode: 404 },
      AccessDenied: { message: 'Access denied', statusCode: 403 },
      InvalidBucketName: { message: 'Invalid bucket name', statusCode: 400 },
      InvalidObjectName: { message: 'Invalid object name', statusCode: 400 },
      SignatureDoesNotMatch: { message: 'Authentication failed', statusCode: 401 },
      SlowDown: { message: 'Too many requests', statusCode: 429 },
      InternalError: { message: 'Storage internal error', statusCode: 500 },
    };

    const mapped = error.code ? errorMap[error.code] : undefined;

    throw new Error(mapped?.message || error.message || 'Unexpected storage error');
  }
};

export const getDocuments = async (params: GetDocumentsParams): Promise<GetDocumentsResponse> => {
  const { bucket, prefix } = params;

  if (!bucket) throw new Error(DOCUMENT_ERRORS.BUCKET_REQUIRED);
  if (!prefix) throw new Error(DOCUMENT_ERRORS.PREFIX_REQUIRED);

  try {
    const objects: string[] = [];

    await new Promise<void>((resolve, reject) => {
      const stream = minioClient.listObjects(bucket, prefix, true);

      stream.on('data', (obj) => {
        if (obj.name) objects.push(obj.name);
      });

      stream.on('end', resolve);
      stream.on('error', reject);
    });

    if (!objects.length) {
      return { urls: [] };
    }

    const urls = await Promise.all(
      objects.map((object) => minioClient.presignedGetObject(bucket, object)),
    );

    return { urls };
  } catch (err) {
    const error = err as Error & { code?: string; statusCode?: number };

    const errorMap: Record<string, { message: string; statusCode: number }> = {
      NoSuchBucket: { message: 'Bucket not found', statusCode: 404 },
      AccessDenied: { message: 'Access denied', statusCode: 403 },
      InvalidBucketName: { message: 'Invalid bucket name', statusCode: 400 },
      SignatureDoesNotMatch: { message: 'Authentication failed', statusCode: 401 },
      SlowDown: { message: 'Too many requests', statusCode: 429 },
      InternalError: { message: 'Storage internal error', statusCode: 500 },
    };

    const mapped = error.code ? errorMap[error.code] : undefined;

    throw new Error(mapped?.message || error.message || 'Unexpected storage error');
  }
};
