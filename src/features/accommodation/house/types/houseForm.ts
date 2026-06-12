import { AccommodationDetails } from '../../types/accommodation';
import { Amenity } from '../../types/accommodationAmenity';
import { Policy } from '../../types/accommodationPolicy';
import { SeasonalPrice } from './seasonalPrice';

export type HouseFormProps = {
  initialData?: AccommodationDetails;
};

export type HouseFormData = {
  title: string;
  capacity: number;
  area: number;
  floors: number;
  bedrooms: number;
  bathrooms: number;

  description: string;

  policies: Array<Policy>;
  amenities: Array<Amenity>;

  country: string;
  city: string;
  latitude: number;
  longitude: number;
  countryCode: string;
  addressDetails: string;

  price: number;
  currencyId: string;
  discount?: number | null;
  availableDates: Array<SeasonalPrice>;
};
