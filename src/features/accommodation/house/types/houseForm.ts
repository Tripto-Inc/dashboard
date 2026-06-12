import { AccommodationDetails } from '../../types/accommodation';
import { AccommodationAmenity } from '../../types/accommodationAmenity';
import { AccommodationPolicy } from '../../types/accommodationPolicy';
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

  policies: Array<AccommodationPolicy>;
  amenities: Array<AccommodationAmenity>;

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
