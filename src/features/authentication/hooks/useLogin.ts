'use client';

import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { login } from '../api/mutations';
import { LoginFormData } from '../types';
import { AUTHENTICATION_SUCCESS } from '../constants';
import { useRouter } from 'next/navigation';

export const useLogin = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: LoginFormData) => login(data),
    onSuccess: () => {
      router.push('/');
      router.refresh();
      toast.success(AUTHENTICATION_SUCCESS.LOGIN);
    },
    onError: (error: Error) => toast.error(error.message),
  });
};
