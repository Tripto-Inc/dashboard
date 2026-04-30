import { ActivityType as PrismaActivityType } from '@/app/generated/prisma/client';

export type ActivityType = PrismaActivityType;

export type ActivityTypeFormData = {
  name: string;
  icon: string;
  title: string;
  isActive: boolean;
  emoji: string | null;
};

export type ActivityTypeOption = {
  value: string;
  label: string;
};

export type ActivityTypeFormProps = {
  initialData?: ActivityType;
};
