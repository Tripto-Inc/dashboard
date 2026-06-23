import { ACTIVITY_ERRORS } from '../constants';
import { ActivityFormData } from '../types';

export const createActivity = async (data: ActivityFormData, heroImage?: File | null) => {
  const response = await fetch('/api/activities', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...data, heroImage }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || ACTIVITY_ERRORS.CREATE_FAILED);
  }

  return response.json();
};

export const updateActivity = async (
  id: string,
  data: ActivityFormData,
  heroImage?: File | null,
) => {
  const response = await fetch(`/api/activities/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...data, heroImage }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || ACTIVITY_ERRORS.UPDATE_FAILED);
  }

  return response.json();
};

export const deleteActivity = async (id: string) => {
  const response = await fetch(`/api/activities/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || ACTIVITY_ERRORS.DELETE_FAILED);
  }

  return response.json();
};
