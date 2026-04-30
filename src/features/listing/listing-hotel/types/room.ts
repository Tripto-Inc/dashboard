import { Amenity } from '../../types/amenityForm';

export type Beds = {
  king?: number;
  queen?: number;
  double?: number;
  single?: number;
};

export type Room = {
  id?: string;
  title: string;
  area: number;
  count: number;
  price: number;
  currencyId: string;
  discount?: number | null;
  capacity: number;
  bedrooms: number;
  bathrooms: number;
  amenities: Array<Amenity>;
  galleryImages?: Array<File> | null;
  beds: Beds;
};

export type RoomProps = {
  error?: string;
  listingId?: string;
  fields: Array<Room>;
  onRemove: (index: number) => void;
  onAppend: (value: Room) => void;
  onUpdate: (index: number, val: Room) => void;
};

export type RoomItemProps = {
  item: Room;
  listingId?: string;
  onEdit: () => void;
  onRemove: () => void;
};

export type RoomFormProps = {
  listingId?: string;
  fields: Array<Room>;
  currentItem: SelectedRoom;
  closeHandler: () => void;
  createHnadler: (room: Room) => void;
  updateHnadler: (index: number, room: Room) => void;
};

export type SelectedRoom = {
  room: Room | null;
  index?: number;
};
