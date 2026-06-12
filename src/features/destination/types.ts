import { Destination as PrismaDestination, Season } from '@/app/generated/prisma/client';

export type Destination = PrismaDestination;

export type DestinationFormData = {
  city: string;
  slogan: string;
  country: string;
  seasons: Season[];
  isActive: boolean;
};

export type DestinationFormProps = {
  initialData?: Destination;
};
