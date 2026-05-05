'use server';

import { s3Client } from '@/lib/s3';
import { minioClient } from '@/lib/minio';
import { GetObjectCommand, HeadObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { DOCUMENT_ERRORS } from '../constants';
import {
  GetDocumentParams,
  GetDocumentResponse,
  GetDocumentsParams,
  GetDocumentsResponse,
} from '../types';

export const getDocument = async (
  params: GetDocumentParams
): Promise<GetDocumentResponse> => {
  const { bucket, object } = params;

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
      const url = await minioClient.presignedGetObject(bucket, object);

      return { isSuccess: true, url };
    }

    // -------------------------
    // S3 (AWS / Supabase S3)
    // -------------------------
    if (provider === 's3') {
      try {
        await s3Client.send(
          new HeadObjectCommand({
            Bucket: bucket,
            Key: object,
          })
        );

        const command = new GetObjectCommand({
          Bucket: bucket,
          Key: object,
        });

        const url = await getSignedUrl(s3Client, command, {
          expiresIn: 60 * 60,
        });

        return {
          isSuccess: true,
          url,
        };
      } catch {
        return { isSuccess: false };
      }
    }

    throw new Error(`Unsupported storage provider: ${provider}`);
  } catch (err) {
    throw err instanceof Error
      ? err
      : new Error('Unexpected storage error', { cause: err });
  }
};


export const getDocuments = async (
  params: GetDocumentsParams
): Promise<GetDocumentsResponse> => {
  const { bucket, prefix } = params;

  if (!bucket) throw new Error(DOCUMENT_ERRORS.BUCKET_REQUIRED);
  if (!prefix) throw new Error(DOCUMENT_ERRORS.PREFIX_REQUIRED);

  const provider = process.env.STORAGE_PROVIDER;

  if (!provider) {
    throw new Error('STORAGE_PROVIDER is not defined');
  }

  try {
    let objects: string[] = [];

    // -------------------------
    // MINIO (stream-based)
    // -------------------------
    if (provider === 'minio') {
      await new Promise<void>((resolve, reject) => {
        const stream = minioClient.listObjects(bucket, prefix, true);

        stream.on('data', (obj) => {
          if (obj.name) objects.push(obj.name);
        });

        stream.on('end', resolve);
        stream.on('error', reject);
      });
    }

    // -------------------------
    // S3 (AWS / Supabase S3)
    // -------------------------
    if (provider === 's3') {
      const response = await s3Client.send(
        new ListObjectsV2Command({
          Bucket: bucket,
          Prefix: prefix,
        })
      );

      objects =
        response.Contents?.map((item) => item.Key).filter(
          (key): key is string => Boolean(key)
        ) ?? [];
    }

    if (!objects.length) {
      return { isSuccess: false, urls: [] };
    }

    const urls = await Promise.all(
      objects.map(async (object) => {
        if (provider === 'minio') {
          return minioClient.presignedGetObject(bucket, object);
        }

        const command = new GetObjectCommand({
          Bucket: bucket,
          Key: object,
        });

        return getSignedUrl(s3Client, command, {
          expiresIn: 60 * 60,
        });
      })
    );

    return { isSuccess: true, urls };
  } catch (err) {
    throw err instanceof Error
      ? err
      : new Error('Unexpected storage error', { cause: err });
  }
};

export const listKeysByPrefix = async (bucket: string, prefix: string) => {
  if (!bucket) throw new Error(DOCUMENT_ERRORS.BUCKET_REQUIRED);
  if (!prefix) throw new Error(DOCUMENT_ERRORS.PREFIX_REQUIRED);

  const provider = process.env.STORAGE_PROVIDER;

  if (!provider) {
    throw new Error('STORAGE_PROVIDER is not defined');
  }

  try {
    let keys: string[] = [];

    // -------------------------
    // MINIO (stream-based)
    // -------------------------
    if (provider === 'minio') {
      await new Promise<void>((resolve, reject) => {
        const stream = minioClient.listObjects(bucket, prefix, true);

        stream.on('data', (obj) => {
          if (obj.name) keys.push(obj.name);
        });

        stream.on('end', resolve);
        stream.on('error', reject);
      });
    }

    // -------------------------
    // S3 (AWS / Supabase S3)
    // -------------------------
    if (provider === 's3') {
      const res = await s3Client.send(
        new ListObjectsV2Command({
          Bucket: bucket,
          Prefix: prefix,
        })
      );

      keys =
        res.Contents?.map((i) => i.Key).filter(
          (key): key is string => Boolean(key)
        ) ?? [];
    }

    return keys;
  } catch (err) {
    throw err instanceof Error
      ? err
      : new Error('Unexpected storage error', { cause: err });
  }
};