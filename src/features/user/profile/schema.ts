import z from 'zod';

export const updateProfileSchema = z.object({
  name: z.string().min(1, "Name can't be empty").nullish(),
  email: z.email().nullish(),
});

export type UpdateProfileSchema = z.infer<typeof updateProfileSchema>;
