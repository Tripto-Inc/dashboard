import { VariantProps } from 'class-variance-authority';
import { ReactNode } from 'react';
import { buttonVariants } from './ButtonPrimary';
import { ButtonColor } from './lib';

type ButtonTone = 'solid' | 'outline' | 'ghost' | 'secondary';

export interface ButtonPrimaryProps
  extends Omit<React.ComponentProps<'button'>, 'color'>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  color?: ButtonColor;
  tone?: ButtonTone;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}
