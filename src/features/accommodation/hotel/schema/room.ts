import z from 'zod';
import { amenitySchema } from '../../schema/amenity';
import { bedSchema } from './bed';
import { galleryImagesSchema } from '../../schema/gallery';

export const roomSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, 'Title is required'),
  area: z.number({ error: 'Area is required' }).positive('Area must be positive'),
  count: z.number({ error: 'Count is required' }).positive('Count must be positive'),
  price: z.number({ error: 'Price is required' }).positive('Price must be positive'),
  currencyId: z.string({ error: 'Currency is required' }).min(1, 'Currency is required'),
  discount: z.number().positive('Discount must be positive').nullish(),
  capacity: z.number({ error: 'Capacity is required' }).positive('Capacity must be positive'),
  bedrooms: z.number().nonnegative('Bedrooms cannot be negative').nullish(),
  bathrooms: z
    .number({ error: 'Bathrooms count is required' })
    .positive('Bathrooms count must be positive'),
  amenities: z.array(amenitySchema).min(1, 'Amenities is required'),
  galleryImages: z.array(galleryImagesSchema).nullish(),
  beds: bedSchema,
});

export type RoomSchema = z.infer<typeof roomSchema>;
