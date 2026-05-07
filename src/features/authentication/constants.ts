export const AUTHENTICATION_ERRORS = {
  INVALID_CREDENTIALS: 'Invalid username or password',
  UNAUTHORIZED: 'You are not authorized to perform this action',
  SESSION_EXPIRED: 'Your session has expired. Please log in again',
  LOGIN_FAILED: 'Login failed. Please try again',
  LOGOUT_FAILED: 'Logout failed. Please try again',
} as const;

export const AUTHENTICATION_SUCCESS = {
  LOGIN: 'Welcome back! You have successfully signed in',
  LOGOUT: 'You have been successfully signed out',
} as const;
