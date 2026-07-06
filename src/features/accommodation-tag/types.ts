import { AccommodationTag as PrismaAccommodationTag } from '@/app/generated/prisma/client';

export type AccommodationTag = PrismaAccommodationTag;

export type AccommodationTagProps = {
  emoji: string;
  title: string;
  textColor: string;
  borderColor: string;
  backgroundColor: string;
};

export type AccommodationTagFormData = {
  title: string;
  emoji: string;
  isActive: boolean;
  textColor: string;
  borderColor: string;
  backgroundColor: string;
};

export type AccommodationTagOption = {
  value: string;
  label: string;
};

export type AccommodationTagFormProps = {
  initialData?: AccommodationTag;
};
