import { PropsWithChildren } from 'react';

export interface FieldWithErrorProps extends PropsWithChildren {
  label?: string;
  error?: string;
  htmlFor: string;
  required?: boolean;
  className?: string;
}
