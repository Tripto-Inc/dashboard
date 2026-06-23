import {
  CreateHotelPayload,
  UpdateHotelPayload,
} from '@/features/accommodation/hotel/types/mutations';
import { ACCOMMODATION_ERRORS } from '@/features/accommodation/constants';

export const createHotel = async (payload: CreateHotelPayload) => {
  const { data, heroImage, galleryImages, roomsGalleryImages } = payload;
  const response = await fetch('/api/accommodations/hotels', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...data, heroImage, galleryImages, roomsGalleryImages }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || ACCOMMODATION_ERRORS.CREATE_FAILED);
  }

  return response.json();
};

export const updateHotel = async (payload: UpdateHotelPayload) => {
  const { id, data, heroImage, galleryImages, roomsGalleryImages } = payload;
  const response = await fetch(`/api/accommodations/hotels/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...data, heroImage, galleryImages, roomsGalleryImages }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || ACCOMMODATION_ERRORS.UPDATE_FAILED);
  }

  return response.json();
};
