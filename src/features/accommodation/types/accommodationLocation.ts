export type AccommodationLocationProps = {
  value: { latitude: number | null; longitude: number | null };
  onChange: (val: { latitude: number | null; longitude: number | null }) => void;
};
