import z from 'zod';

export const bedSchema = z.object({
  king: z.number().positive('King size bed count must be positive').optional(),
  queen: z.number().positive('Queen size bed count must be positive').optional(),
  double: z.number().positive('Double size bed count must be positive').optional(),
  single: z.number().positive('Single size bed count must be positive').optional(),
});
