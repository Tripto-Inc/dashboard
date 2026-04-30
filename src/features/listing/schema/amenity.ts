import z from 'zod';

export const amenitySchema = z.object({
  title: z.string().min(1, 'Title is required'),
  icon: z
    .string()
    .min(1, 'Icon is required')
    .startsWith('Icon', { error: 'This icon is not from Tabler Icons' }),
});

export type AmenitySchema = z.infer<typeof amenitySchema>;
