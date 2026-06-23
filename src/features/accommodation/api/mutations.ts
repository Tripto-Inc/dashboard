import { ACCOMMODATION_ERRORS } from '../constants';

export const deleteAccommodation = async (id: string) => {
  const response = await fetch(`/api/accommodations/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || ACCOMMODATION_ERRORS.DELETE_FAILED);
  }

  return response.json();
};
