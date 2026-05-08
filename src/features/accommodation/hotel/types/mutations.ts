import { HotelFormData } from './hotelForm';

export type CreateHotelPayload = {
  heroImage?: File | null;
  data: HotelFormData;
  galleryImages?: Array<File> | null;
  roomsGalleryImages?: Array<Array<File>>;
};

export type UpdateHotelPayload = {
  id: string;
  heroImage?: File | null;
  data: HotelFormData;
  galleryImages?: Array<File> | null;
  roomsGalleryImages?: Array<Array<File>>;
};
