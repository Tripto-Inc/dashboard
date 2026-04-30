import z from 'zod';

export const currencySchema = z.object({
  title: z.string().min(1, 'Title is required'),
  symbol: z.string().min(1, 'Symbol is required'),
  isoCode: z
    .string()
    .min(1, 'ISO Code is required')
    .max(3, 'ISO Code must be 3 letters')
    .uppercase({ error: 'ISO Code must be uppercase letters' }),
  isActive: z.boolean(),
});

export type CurrencySchema = z.infer<typeof currencySchema>;
