'use server';

import { signIn, signOut } from '@/auth';
import { AuthError } from 'next-auth';
import { AUTHENTICATION_ERRORS } from '../constants';
import { LoginFormData } from '../types';

export const login = async (data: LoginFormData) => {
  try {
    return await signIn('credentials', {
      username: data.username,
      password: data.password,
      redirect: false,
    });
  } catch (err) {
    const error = err as AuthError;
    if (error?.type === 'CredentialsSignin' || error?.message === 'CredentialsSignin') {
      throw new Error(AUTHENTICATION_ERRORS.INVALID_CREDENTIALS);
    }
    throw new Error(AUTHENTICATION_ERRORS.LOGIN_FAILED);
  }
};
export const loginWithGoogle = async () => await signIn('google', { redirectTo: '/' });
export const logout = async () => await signOut({ redirect: false });
