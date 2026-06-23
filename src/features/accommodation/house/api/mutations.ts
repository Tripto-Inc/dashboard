import { HouseFormData } from '@/features/accommodation/house/types/houseForm';
import { ACCOMMODATION_ERRORS } from '@/features/accommodation/constants';

export const createHouse = async (
  data: HouseFormData,
  heroImage?: File | null,
  galleryImages?: Array<File> | null,
) => {
  const response = await fetch('/api/accommodations/houses', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...data, heroImage, galleryImages }),
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
  const response = await fetch(`/api/accommodations/houses/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...data, heroImage, galleryImages }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || ACCOMMODATION_ERRORS.UPDATE_FAILED);
  }

  return response.json();
};
