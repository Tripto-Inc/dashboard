import z from 'zod';

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/webp', 'image/avif'] as const;

export const activitySchema = z.object({
  title: z.string().min(1, 'Title is required'),
  price: z.number({ error: 'Price is required' }).positive('Price must be positive'),
  discount: z.number().positive('Discount must be positive').nullish(),
  addressId: z.string().optional(),
  currencyId: z.string({ error: 'Currency is required' }).min(1, 'Currency is required'),
  activityTypeId: z
    .string({ error: 'Activity Type is required' })
    .min(1, 'Activity Type is required'),
  country: z.string().min(1, 'Country is required'),
  countryCode: z.string().min(1, 'Country code is required'),
  city: z.string().min(1, 'City is required'),
  addressDetails: z.string().min(1, 'Address details is required'),
  isActive: z.boolean(),
  heroImage: z
    .custom<File>()
    .optional()
    .refine((file) => !file || (ALLOWED_TYPES as readonly string[]).includes(file.type), {
      message: 'Only PNG, JPG or WEBP files are allowed',
    })
    .refine((file) => !file || file.size <= MAX_FILE_SIZE, {
      message: 'File size must be under 5MB',
    }),
});

export type ActivitySchema = z.infer<typeof activitySchema>;
