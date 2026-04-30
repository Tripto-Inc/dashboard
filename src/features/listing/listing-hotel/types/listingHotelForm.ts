import { HotelListing } from '@/app/generated/prisma/client';
import { Amenity } from '../../types/amenityForm';
import { ListingDetails } from '../../types/listing';
import { Policy } from '../../types/policyForm';
import { Room } from './room';

export type ListingHotelFormProps = {
  initialData?: ListingDetails;
};

export type ListingHotelFormData = {
  title: string;
  description: string;
  policies: Array<Policy>;
  amenities: Array<Amenity>;

  country: string;
  city: string;
  latitude: number;
  longitude: number;
  countryCode: string;
  addressDetails: string;

  rooms: Array<Room>;
};
