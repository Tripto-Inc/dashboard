import z from 'zod';

export const loginFormSchema = z.object({
  username: z.string().min(1, "Username can't be empty"),
  password: z.string().min(1, "Password can't be empty"),
});
