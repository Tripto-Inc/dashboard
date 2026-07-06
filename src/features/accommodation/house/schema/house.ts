import z from 'zod';
import { locationSchema } from '@/features/accommodation/schema/location';
import { galleryImagesSchema, heroImageSchema } from '@/features/accommodation/schema/gallery';
import { seasonalPriceSchema } from '@/features/accommodation/house/schema/seasonalPrice';
import { policySchema } from '@/features/accommodation/schema/policy';
import { amenitySchema } from '@/features/accommodation/schema/amenity';

export const houseSchema = z.object({
  ...locationSchema.shape,
  id: z.string().optional(),
  title: z.string().min(1, 'Title is required'),
  capacity: z.number({ error: 'Capacity is required' }).positive('Capacity must be positive'),
  area: z.number({ error: 'Area is required' }).positive('Area must be positive'),
  floors: z.number({ error: 'Floors count is required' }).positive('Floors count must be positive'),
  bedrooms: z
    .number({ error: 'Bedrooms count is required' })
    .positive('Bedrooms count must be positive'),
  bathrooms: z
    .number({ error: 'Bathrooms count is required' })
    .positive('Bathrooms count must be positive'),
  accommodationTagId: z.string({ error: 'Tag is required' }).min(1, 'Tag is required'),
  description: z
    .string()
    .min(1, 'Description is required')
    .max(3000, 'Description cannot be more than 3000 characters'),
  price: z.number({ error: 'Price is required' }).positive('Price must be positive'),
  discount: z.number().positive('Discount must be positive').nullish(),
  currencyId: z.string({ error: 'Currency is required' }).min(1, 'Currency is required'),

  heroImage: heroImageSchema,
  availableDates: z.array(seasonalPriceSchema),
  galleryImages: z.array(galleryImagesSchema).nullish(),
  policies: z.array(policySchema).min(1, 'Policies is required'),
  amenities: z.array(amenitySchema).min(1, 'Amenities is required'),
});

export type HouseSchema = z.infer<typeof houseSchema>;
