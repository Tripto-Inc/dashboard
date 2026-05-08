import z from 'zod';

export const policySchema = z.object({
  title: z.string().min(1, 'Title is required'),
  icon: z
    .string()
    .min(1, 'Icon is required')
    .startsWith('Icon', { error: 'This icon is not from Tabler Icons' }),
  description: z.string().min(1, 'Description is required'),
});

export type PolicySchema = z.infer<typeof policySchema>;
