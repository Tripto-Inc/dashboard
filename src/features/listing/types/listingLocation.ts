import { Control, FieldErrors } from 'react-hook-form';
import { LocationSchema } from '../schema/location';

export type ListingLocationProps = {
  value: { latitude: number | null; longitude: number | null };
  onChange: (val: { latitude: number | null; longitude: number | null }) => void;
};
