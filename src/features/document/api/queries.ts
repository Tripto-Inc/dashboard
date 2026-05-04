'use server';

'use server';

import { minioClient } from '@/lib/minio';
import { DOCUMENT_ERRORS } from '../constants';
import {
  GetDocumentParams,
  GetDocumentResponse,
  GetDocumentsParams,
  GetDocumentsResponse,
} from '../types';
import { supabase } from '@/lib/supabase';

console.log(process.env.STORAGE_PROVIDER)

export const getDocument = async (params: GetDocumentParams): Promise<GetDocumentResponse> => {
  const { bucket, object } = params;

  if (!bucket) throw new Error(DOCUMENT_ERRORS.BUCKET_REQUIRED);
  if (!object) throw new Error(DOCUMENT_ERRORS.OBJECT_REQUIRED);

  const provider = process.env.STORAGE_PROVIDER;

  if (!provider) {
    throw new Error('STORAGE_PROVIDER is not defined');
  }

  try {
    if (provider === 'minio') {
      const url = await minioClient.presignedGetObject(bucket, object);

      return { isSuccess: true, url };
    }

    if (provider === 'supabase') {
      const { data } = supabase.storage.from(bucket).getPublicUrl(object);

      if (!data?.publicUrl) {
        return { isSuccess: false };
      }

      return {
        isSuccess: true,
        url: data.publicUrl,
      };
    }

    throw new Error(`Unsupported storage provider: ${provider}`);
  } catch (err) {
    throw err instanceof Error ? err : new Error('Unexpected storage error', { cause: err });
  }
};

export const getDocuments = async (params: GetDocumentsParams): Promise<GetDocumentsResponse> => {
  const { bucket, prefix } = params;

  if (!bucket) throw new Error(DOCUMENT_ERRORS.BUCKET_REQUIRED);
  if (!prefix) throw new Error(DOCUMENT_ERRORS.PREFIX_REQUIRED);

  const provider = process.env.STORAGE_PROVIDER;

  if (!provider) {
    throw new Error('STORAGE_PROVIDER is not defined');
  }

  try {
    let objects: string[] = [];

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

    if (provider === 'supabase') {
      const { data, error } = await supabase.storage.from(bucket).list(prefix, {
        limit: 100,
        sortBy: { column: 'name', order: 'asc' },
      });

      if (error) throw error;

      objects = (data ?? []).filter((file) => file.name).map((file) => `${prefix}/${file.name}`);
    }

    if (!objects.length) {
      return { isSuccess: false, urls: [] };
    }

    const urls = await Promise.all(
      objects.map(async (object) => {
        if (provider === 'minio') {
          return minioClient.presignedGetObject(bucket, object);
        }

        const { data } = supabase.storage.from(bucket).getPublicUrl(object);

        return data.publicUrl;
      }),
    );

    return { isSuccess: true, urls };
  } catch (err) {
    throw err instanceof Error ? err : new Error('Unexpected storage error', { cause: err });
  }
};
