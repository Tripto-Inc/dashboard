import { AccommodationAmenity } from '../../types/accommodationAmenity';

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
  capacity: number;
  bathrooms: number;
  currencyId: string;
  discount?: number | null;
  bedrooms?: number | null;
  amenities: Array<AccommodationAmenity>;
  galleryImages?: Array<File> | null;
  beds: Beds;
};

export type RoomProps = {
  error?: string;
  fields: Array<Room>;
  accommodationId?: string;
  onRemove: (index: number) => void;
  onAppend: (value: Room) => void;
  onUpdate: (index: number, val: Room) => void;
};

export type RoomItemProps = {
  item: Room;
  onEdit: () => void;
  onRemove: () => void;
  accommodationId?: string;
};

export type RoomFormProps = {
  fields: Array<Room>;
  accommodationId?: string;
  currentItem: SelectedRoom;
  closeHandler: () => void;
  createHandler: (room: Room) => void;
  updateHandler: (index: number, room: Room) => void;
};

export type SelectedRoom = {
  room: Room | null;
  index?: number;
};
