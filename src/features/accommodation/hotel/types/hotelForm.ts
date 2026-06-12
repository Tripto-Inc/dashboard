import { AccommodationDetails } from '../../types/accommodation';
import { Amenity } from '../../types/accommodationAmenity';
import { Policy } from '../../types/accommodationPolicy';
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
