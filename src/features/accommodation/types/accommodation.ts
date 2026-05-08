import {
  Address,
  House,
  Accommodation as PrismaAccommodation,
  Hotel as PrismaHotel,
  Room as PrismaRoom,
} from '@/app/generated/prisma/client';
import { Amenity } from './amenityForm';
import { Policy } from './policyForm';

export type Accommodation = PrismaAccommodation;
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
  type?: 'HOUSE' | 'HOTEL';
  policies: Array<Policy>;
  amenities: Array<Amenity>;
};
