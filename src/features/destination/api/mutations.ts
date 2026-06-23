import { DestinationFormData } from '@/features/destination/types';
import { DESTINATION_ERRORS } from '@/features/destination/constants';

export const createDestination = async (data: DestinationFormData) => {
  const response = await fetch('/api/destinations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || DESTINATION_ERRORS.CREATE_FAILED);
  }

  return response.json();
};

export const updateDestination = async (id: string, data: DestinationFormData) => {
  const response = await fetch(`/api/destinations/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || DESTINATION_ERRORS.UPDATE_FAILED);
  }

  return response.json();
};

export const deleteDestination = async (id: string) => {
  const response = await fetch(`/api/destinations/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || DESTINATION_ERRORS.DELETE_FAILED);
  }

  return response.json();
};
