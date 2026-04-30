export type Amenity = {
  id?: string;
  icon: string;
  title: string;
};

export type AmenityProps = {
  error?: string;
  fields: Array<Amenity>;
  onAppend: (val: Amenity) => void;
  onRemove: (index: number) => void;
  onUpdate: (index: number, val: Amenity) => void;
};

export type AmenityItemProps = {
  item: Amenity;
  onEdit: () => void;
  onRemove: () => void;
};

export type AmenityFormProps = {
  currentItem: SelectedAmenity;
  closeHandler: () => void;
  createHnadler: (amenity: Amenity) => void;
  updateHnadler: (index: number, amenity: Amenity) => void;
};

export type SelectedAmenity = {
  amenity: Amenity | null;
  index?: number;
};
