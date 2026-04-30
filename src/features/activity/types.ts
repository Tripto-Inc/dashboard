import {
  ActivityType,
  Address,
  Currency,
  Activity as PrismaActivity,
} from '@/app/generated/prisma/client';

export type Activity = PrismaActivity;

export type ActivityColumnDTO = PrismaActivity & {
  address: Address;
  currency: Currency;
  activityType: ActivityType;
};

export type ActivityDTO = PrismaActivity & {
  city: string;
  country: string;
  countryCode: string;
  addressDetails: string;
};

export type ActivityFormData = {
  title: string;
  price: number;
  discount?: number | null;
  currencyId: string;
  activityTypeId: string;
  city: string;
  country: string;
  countryCode: string;
  addressDetails: string;
  isActive: boolean;
};

export type ActivityFormProps = {
  initialData?: Activity;
};
