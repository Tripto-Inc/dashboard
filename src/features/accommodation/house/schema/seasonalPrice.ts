import z from 'zod';

export const seasonalPriceSchema = z.object({
  date: z.string(),
  price: z.number({ error: 'Price is required' }),
});

export type SeasonalPriceSchema = z.infer<typeof seasonalPriceSchema>;
