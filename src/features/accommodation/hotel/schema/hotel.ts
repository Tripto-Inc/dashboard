import z from 'zod';
import { locationSchema } from '@/features/accommodation/schema/location';
import { galleryImagesSchema, heroImageSchema } from '@/features/accommodation/schema/gallery';
import { roomSchema } from '@/features/accommodation/hotel/schema/room';
import { policySchema } from '@/features/accommodation/schema/policy';
import { amenitySchema } from '@/features/accommodation/schema/amenity';

export const hotelSchema = z.object({
  ...locationSchema.shape,
  id: z.string().optional(),
  title: z.string().min(1, 'Title is required'),
  description: z
    .string()
    .min(1, 'Description is required')
    .max(3000, 'Description cannot be more than 3000 characters'),

  heroImage: heroImageSchema,
  galleryImages: z.array(galleryImagesSchema).nullish(),
  rooms: z.array(roomSchema).min(1, 'Rooms is required'),
  policies: z.array(policySchema).min(1, 'Policies is required'),
  amenities: z.array(amenitySchema).min(1, 'Amenities is required'),
});

export type HotelSchema = z.infer<typeof hotelSchema>;
