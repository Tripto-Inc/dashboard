import { AccommodationDetails } from '../../types/accommodation';
import { Amenity } from '../../types/amenityForm';
import { Policy } from '../../types/policyForm';
import { Room } from './room';

export type HotelFormProps = {
  initialData?: AccommodationDetails;
};

export type HotelFormData = {
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
