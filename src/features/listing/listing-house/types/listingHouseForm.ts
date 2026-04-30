import { Amenity } from '../../types/amenityForm';
import { ListingDetails } from '../../types/listing';
import { Policy } from '../../types/policyForm';
import { SeasonalPrice } from './seasonalPrice';

export type ListingHouseFormProps = {
  initialData?: ListingDetails;
};

export type ListingHouseFormData = {
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
