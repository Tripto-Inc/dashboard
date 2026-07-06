import z from 'zod';

export const accommodationTagSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  emoji: z.string().min(1, 'Emoji is required'),
  textColor: z.string().min(1, 'Text color is required'),
  borderColor: z.string().min(1, 'Border color is required'),
  backgroundColor: z.string().min(1, 'Background color is required'),
  isActive: z.boolean(),
});

export type AccommodationTagSchema = z.infer<typeof accommodationTagSchema>;
