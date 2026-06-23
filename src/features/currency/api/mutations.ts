import { CURRENCY_ERRORS } from '@/features/currency/constants';
import { CurrencyFormData } from '@/features/currency/types';

export const createCurrency = async (data: CurrencyFormData) => {
  const response = await fetch('/api/currencies', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || CURRENCY_ERRORS.CREATE_FAILED);
  }

  return response.json();
};

export const updateCurrency = async (id: string, data: CurrencyFormData) => {
  const response = await fetch(`/api/currencies/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || CURRENCY_ERRORS.UPDATE_FAILED);
  }

  return response.json();
};

export const deleteCurrency = async (id: string) => {
  const response = await fetch(`/api/currencies/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || CURRENCY_ERRORS.DELETE_FAILED);
  }

  return response.json();
};
