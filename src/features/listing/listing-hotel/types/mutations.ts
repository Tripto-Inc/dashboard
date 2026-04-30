import { ListingHotelFormData } from './listingHotelForm';

export type CreateListingHotelPayload = {
  heroImage?: File | null;
  data: ListingHotelFormData;
  galleryImages?: Array<File> | null;
  roomsGalleryImages?: Array<Array<File>>;
};

export type UpdateListingHotelPayload = {
  id: string;
  heroImage?: File | null;
  data: ListingHotelFormData;
  galleryImages?: Array<File> | null;
  roomsGalleryImages?: Array<Array<File>>;
};
