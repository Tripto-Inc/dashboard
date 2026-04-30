import z from 'zod';
import { amenitySchema } from '../../schema/amenity';
import { policySchema } from '../../schema/policy';
import { galleryImagesSchema, heroImageSchema } from '../../schema/gallery';
import { roomSchema } from './room';
import { locationSchema } from '../../schema/location';

export const listingHotelSchema = z.object({
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

export type ListingHotelSchema = z.infer<typeof listingHotelSchema>;
