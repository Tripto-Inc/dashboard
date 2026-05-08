import z from 'zod';

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/webp', 'image/avif'] as const;

export const heroImageSchema = z
  .instanceof(File, { message: 'Invalid file' })
  .refine((file) => ALLOWED_TYPES.includes(file.type as (typeof ALLOWED_TYPES)[number]), {
    message: 'Only PNG, JPG or WEBP files are allowed',
  })
  .refine((file) => file.size <= MAX_FILE_SIZE, {
    message: 'Each file size must be under 5MB',
  })
  .nullish();

export const galleryImagesSchema = z
  .instanceof(File, { message: 'Invalid file' })
  .refine((file) => ALLOWED_TYPES.includes(file.type as (typeof ALLOWED_TYPES)[number]), {
    message: 'Only PNG, JPG or WEBP files are allowed',
  })
  .refine((file) => file.size <= MAX_FILE_SIZE, {
    message: 'Each file size must be under 5MB',
  });
