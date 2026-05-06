'use server';

import { signIn, signOut } from '@/auth';
import { AUTHENTICATION_ERRORS } from '../constants';
import { LoginFormData, NextAuthSignInError } from '../types';

export const loginWithGoogle = async () => await signIn('google', { redirectTo: '/' });
export const login = async (data: LoginFormData) => {
  try {
    const result = await signIn('credentials', {
      username: data.username,
      password: data.password,
      redirect: false,
      callbackUrl: '/',
    });

    if (!result || result.error) {
      throw new Error(AUTHENTICATION_ERRORS.INVALID_CREDENTIALS);
    }
  } catch (err) {
    const error = err as NextAuthSignInError;
    if (error?.type === 'CredentialsSignin' || error?.message === 'CredentialsSignin') {
      throw new Error(AUTHENTICATION_ERRORS.INVALID_CREDENTIALS);
    }

    throw new Error(AUTHENTICATION_ERRORS.LOGIN_FAILED);
  }
};
export const logout = async () => await signOut({ redirectTo: '/login' });
