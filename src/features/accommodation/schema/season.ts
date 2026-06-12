import z from 'zod';
import { Season } from '@/app/generated/prisma/enums';

export const seasonSchema = z.object({
  season: z.enum(Season, {
    error: 'Gallery is required',
  }),
});
