import { DocumentBucket, DocumentQueryKeysParams } from './types';

export const DOCUMENT_QUERY_KEYS = {
  all: ['document'] as const,
  document: (params: DocumentQueryKeysParams) =>
    [...DOCUMENT_QUERY_KEYS.all, params.bucket, params.category, params.id] as const,
  documents: (params: DocumentQueryKeysParams) =>
    [...DOCUMENT_QUERY_KEYS.all, params.bucket, params.category, params.id] as const,
};

export const BUCKETS: Record<DocumentBucket, string> = {
  activities: 'activities',
  listings: 'listings',
} as const;

export const DOCUMENT_ERRORS = {
  DUPLICATE: 'Activity with this title, address and activity type already exists',
  DUPLICATE_TITLE: 'Activity with this name already exists',
  NOT_FOUND: 'File not found',
  BUCKET_REQUIRED: 'Bucket name is required',
  PREFIX_REQUIRED: 'Prefix name is required',
  OBJECT_REQUIRED: 'Object name is required',
  FILE_REQUIRED: 'File name is required',
  IN_USE: 'Cannot delete activity because it is being used by activities or listings',
  CREATE_FAILED: 'Failed to create activity. Please try again.',
  UPDATE_FAILED: 'Failed to update activity. Please try again.',
  DELETE_FAILED: 'Failed to delete activity. Please try again.',
} as const;

export const DOCUMENT_SUCCESS = {
  CREATED: 'Activity created successfully',
  UPDATED: 'Activity updated successfully',
  DELETED: 'Activity deleted successfully',
} as const;
