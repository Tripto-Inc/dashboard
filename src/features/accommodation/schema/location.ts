import z from 'zod';

export const locationSchema = z.object({
  country: z.string().min(1, 'Country is required'),
  countryCode: z.string().min(1, 'Country code is required'),
  city: z.string().min(1, 'City is required'),
  addressDetails: z.string().min(1, 'Address details is required'),
  latitude: z.number({ error: 'Latitude is required' }).nullable(),
  longitude: z.number({ error: 'Longitude is required' }).nullable(),
});

export type LocationSchema = z.infer<typeof locationSchema>;
