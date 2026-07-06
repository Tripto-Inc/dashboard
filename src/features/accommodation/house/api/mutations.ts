import { HouseFormData } from '@/features/accommodation/house/types/houseForm';
import { ACCOMMODATION_ERRORS } from '@/features/accommodation/constants';

export const createHouse = async (
  data: HouseFormData,
  heroImage?: File | null,
  galleryImages?: Array<File> | null,
) => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value === undefined || value === null) return;

    if (key === 'policies' || key === 'amenities' || key === 'availableDates') {
      formData.append(key, JSON.stringify(value));
      return;
    }

    formData.append(key, String(value));
  });

  if (heroImage) {
    formData.append('heroImage', heroImage);
  }

  if (galleryImages && galleryImages.length > 0) {
    galleryImages.forEach((file) => {
      formData.append('galleryImages', file);
    });
  }

  const response = await fetch('/api/accommodations/houses', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || ACCOMMODATION_ERRORS.CREATE_FAILED);
  }

  return response.json();
};

export const updateHouse = async (
  id: string,
  data: HouseFormData,
  heroImage?: File | null,
  galleryImages?: Array<File> | null,
) => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value === undefined || value === null) return;

    if (key === 'policies' || key === 'amenities' || key === 'availableDates') {
      formData.append(key, JSON.stringify(value));
      return;
    }

    formData.append(key, String(value));
  });

  if (heroImage) {
    formData.append('heroImage', heroImage);
  }

  if (galleryImages && galleryImages.length > 0) {
    galleryImages.forEach((file) => {
      formData.append('galleryImages', file);
    });
  }

  const response = await fetch(`/api/accommodations/houses/${id}`, {
    method: 'PUT',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || ACCOMMODATION_ERRORS.UPDATE_FAILED);
  }

  return response.json();
};
