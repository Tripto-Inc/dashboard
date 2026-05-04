'use server';

import { minioClient } from '@/lib/minio';
import { supabase } from '@/lib/supabase';
import { DOCUMENT_ERRORS } from '../constants';
import { DeleteDocumentParams, UploadDocumentParams } from '../types';

export const uploadDocument = async ({ bucket, object, file }: UploadDocumentParams) => {
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

    if (provider === 'minio') {
      await minioClient.putObject(bucket, object, buffer, buffer.length, {
        'Content-Type': file.type || 'application/octet-stream',
      });

      return { success: true };
    }

    if (provider === 'supabase') {
      const { error } = await supabase.storage.from(bucket).upload(object, buffer, {
        contentType: file.type || 'application/octet-stream',
        upsert: true,
      });

      if (error) throw error;

      return { success: true };
    }

    throw new Error(`Unsupported storage provider: ${provider}`);
  } catch (err) {
    throw err instanceof Error ? err : new Error('Unexpected storage error', { cause: err });
  }
};

export const deleteDocument = async ({ bucket, object }: DeleteDocumentParams) => {
  if (!bucket) throw new Error(DOCUMENT_ERRORS.BUCKET_REQUIRED);
  if (!object) throw new Error(DOCUMENT_ERRORS.OBJECT_REQUIRED);

  const provider = process.env.STORAGE_PROVIDER;

  if (!provider) {
    throw new Error('STORAGE_PROVIDER is not defined');
  }

  try {
    if (provider === 'minio') {
      await minioClient.removeObject(bucket, object);
      return { success: true };
    }

    if (provider === 'supabase') {
      const res = await supabase.storage.from(bucket).list('', { limit: 10 });

      console.log(res);
      const result = await supabase.storage.from(bucket).remove([object]);
      console.log(result);

      return { success: true };
    }

    throw new Error(`Unsupported storage provider: ${provider}`);
  } catch (err) {
    throw err instanceof Error ? err : new Error('Unexpected storage error', { cause: err });
  }
};
