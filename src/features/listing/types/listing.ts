import {
  Address,
  HotelListing as PrismaHotelListing,
  HouseListing,
  Room as PrismaRoom,
  Listing as PrismaListing,
} from '@/app/generated/prisma/client';
import { Amenity } from './amenityForm';
import { Policy } from './policyForm';

export type Listing = PrismaListing;
export type HotelListing = PrismaHotelListing & { rooms: Array<PrismaRoom> };

export type ListingDetails = Listing & {
  address: Address;
  house: HouseListing | null;
  hotel: HotelListing | null;
};

export type ListingFormsWrapperProps = {
  initialData?: ListingDetails;
};

export type ListingColumns = {
  id: string;
  title: string;
  address: Address;
  type?: 'HOUSE' | 'HOTEL';
  policies: Array<Policy>;
  amenities: Array<Amenity>;
};
