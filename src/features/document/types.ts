export type DocumentCategory = 'hero' | 'gallery' | 'roomGallery';
export type DocumentBucket = 'activities' | 'listings';

export type UseGetDocumentParams = GetDocumentParams & { id: string };
export type UseGetDocumentsParams = GetDocumentsParams & { id: string };

export type DocumentQueryKeysParams = {
  id?: string;
  bucket: DocumentBucket;
  category: DocumentCategory;
};

export type GetDocumentParams = {
  object: string;
  bucket: DocumentBucket;
  category: DocumentCategory;
};

export type GetDocumentsParams = {
  prefix: string;
  bucket: DocumentBucket;
  category: DocumentCategory;
};

export type GetDocumentResponse = {
  url?: string;
};

export type GetDocumentsResponse = {
  urls?: Array<string>;
};

export type DeleteDocumentParams = {
  bucket: string;
  object: string;
};

export type UploadDocumentParams = {
  bucket: string;
  object: string;
  file: File;
};

export type GetActivityHeroImageParams = {
  id?: string;
  onSuccess?: (url: string | null) => void;
};

export type ImagePreviewProps = {
  src?: string;
  title?: string;
  className: string;
  onDelete: () => void;
};

export type ImagePreviewWrapperProps = {
  id: string;
  title: string;
  object: string;
  className?: string;
  bucket: DocumentBucket;
  category?: DocumentCategory;
};

export type ImagesPreviewWrapperProps = {
  id: string;
  title: string;
  prefix: string;
  className?: string;
  skeletonCount?: number;
  bucket: DocumentBucket;
  category?: DocumentCategory;
};

export type ImagesPreviewWrapperSkeletonProps = {
  count?: number;
  className?: string;
};
