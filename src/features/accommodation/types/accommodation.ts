import {
  Address,
  House,
  Accommodation as PrismaAccommodation,
  Hotel as PrismaHotel,
  Room as PrismaRoom,
} from '@/app/generated/prisma/client';
import { AccommodationAmenity } from './accommodationAmenity';
import { AccommodationPolicy } from './accommodationPolicy';
import { AccommodationTag } from '@/features/accommodation-tag/types';

export type Accommodation = PrismaAccommodation;
export type AccommodationType = 'HOUSE' | 'HOTEL';
export type Hotel = PrismaHotel & { rooms: Array<PrismaRoom> };

export type AccommodationDetails = Accommodation & {
  address: Address;
  house: House | null;
  hotel: Hotel | null;
};

export type AccommodationFormsWrapperProps = {
  initialData?: AccommodationDetails;
};

export type AccommodationColumns = {
  id: string;
  title: string;
  address: Address;
  tag: AccommodationTag
  type?: AccommodationType;
  policies: Array<AccommodationPolicy>;
  amenities: Array<AccommodationAmenity>;
};
