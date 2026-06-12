export type AccommodationAmenity = {
  id?: string;
  icon: string;
  title: string;
};

export type AccommodationAmenityProps = {
  error?: string;
  fields: Array<AccommodationAmenity>;
  onAppend: (val: AccommodationAmenity) => void;
  onRemove: (index: number) => void;
  onUpdate: (index: number, val: AccommodationAmenity) => void;
};

export type AccommodationAmenityItemProps = {
  item: AccommodationAmenity;
  onEdit: () => void;
  onRemove: () => void;
};

export type AccommodationAmenityFormProps = {
  currentItem: SelectedAccommodationAmenity;
  closeHandler: () => void;
  createHandler: (amenity: AccommodationAmenity) => void;
  updateHandler: (index: number, amenity: AccommodationAmenity) => void;
};

export type SelectedAccommodationAmenity = {
  index?: number;
  amenity: AccommodationAmenity | null;
};
