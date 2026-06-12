import z from 'zod';
import { Season } from '@/app/generated/prisma/enums';

export const destinationSchema = z.object({
  city: z.string().min(1, 'City is required'),
  country: z.string().min(1, 'Country is required'),
  slogan: z.string().min(1, 'Slogan is required'),
  seasons: z
    .array(z.enum(Season), { message: 'Season is required' })
    .min(1, { message: 'Season is required' }),
  isActive: z.boolean(),
});

export type DestinationSchema = z.infer<typeof destinationSchema>;
