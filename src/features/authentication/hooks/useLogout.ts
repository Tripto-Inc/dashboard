'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { logout } from '../api/mutations';
import { AUTHENTICATION_ERRORS, AUTHENTICATION_SUCCESS } from '../constants';
import { queryClient } from '@/lib/query-client';

export const useLogout = () => {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const mutateAsync = async () => {
    setIsPending(true);

    const promise = logout();

    toast.promise(promise, {
      loading: 'Logging out...',
      success: AUTHENTICATION_SUCCESS.LOGOUT,
      error: AUTHENTICATION_ERRORS.LOGOUT_FAILED,
    });

    try {
      await promise;
      queryClient.clear();
      router.replace('/login');
    } finally {
      setIsPending(false);
    }
  };

  return { mutateAsync, isPending };
};
