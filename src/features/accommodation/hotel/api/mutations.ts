import {
  CreateHotelPayload,
  UpdateHotelPayload,
} from '@/features/accommodation/hotel/types/mutations';
import { ACCOMMODATION_ERRORS } from '@/features/accommodation/constants';

export const createHotel = async (payload: CreateHotelPayload) => {
  const { data, heroImage, galleryImages, roomsGalleryImages } = payload;

  const formData = new FormData();
  formData.append('data', JSON.stringify(data));

  if (heroImage) formData.append('heroImage', heroImage);

  if (galleryImages?.length) {
    galleryImages.forEach((file) => formData.append('galleryImages', file));
  }

  if (roomsGalleryImages?.length) {
    roomsGalleryImages.forEach((roomFiles, index) => {
      roomFiles.forEach((file) => {
        formData.append(`roomsGalleryImages_${index}`, file);
      });
    });
  }

  const response = await fetch('/api/accommodations/hotels', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || ACCOMMODATION_ERRORS.CREATE_FAILED);
  }

  return response.json();
};

export const updateHotel = async (payload: UpdateHotelPayload) => {
  const { id, data, heroImage, galleryImages, roomsGalleryImages } = payload;

  const formData = new FormData();
  formData.append('data', JSON.stringify(data));

  if (heroImage) formData.append('heroImage', heroImage);

  if (galleryImages?.length) {
    galleryImages.forEach((file) => formData.append('galleryImages', file));
  }

  if (roomsGalleryImages?.length) {
    roomsGalleryImages.forEach((roomFiles, index) => {
      roomFiles.forEach((file) => {
        formData.append(`roomsGalleryImages_${index}`, file);
      });
    });
  }

  const response = await fetch(`/api/accommodations/hotels/${id}`, {
    method: 'PUT',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || ACCOMMODATION_ERRORS.UPDATE_FAILED);
  }

  return response.json();
};