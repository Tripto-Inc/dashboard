import { ActivityTypeFormData } from '@/features/activity-type/types';
import { ACTIVITY_TYPE_ERRORS } from '@/features/activity-type/constants';

export const createActivityType = async (data: ActivityTypeFormData) => {
  const response = await fetch('/api/activity-types', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || ACTIVITY_TYPE_ERRORS.CREATE_FAILED);
  }

  return response.json();
};

export const updateActivityType = async (id: string, data: ActivityTypeFormData) => {
  const response = await fetch(`/api/activity-types/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || ACTIVITY_TYPE_ERRORS.UPDATE_FAILED);
  }

  return response.json();
};

export const deleteActivityType = async (id: string) => {
  const response = await fetch(`/api/activity-types/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || ACTIVITY_TYPE_ERRORS.DELETE_FAILED);
  }

  return response.json();
};
