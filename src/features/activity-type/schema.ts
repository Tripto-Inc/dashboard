import z from 'zod';

export const activityTypeSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .uppercase({ error: 'Name must be uppercase letters' }),
  title: z.string().min(1, 'Title is required'),
  icon: z
    .string()
    .min(1, 'Icon is required')
    .startsWith('Icon', { error: 'This icon is not from Tabler Icons' }),
  emoji: z.string().nullable(),
  isActive: z.boolean(),
});

export type ActivityTypeSchema = z.infer<typeof activityTypeSchema>;
