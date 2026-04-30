import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import type { FC } from 'react';

import { cn } from '@/lib/utils';
import { buttonTheme } from './lib';
import { ButtonPrimaryProps } from './types';

export const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all',
    'disabled:pointer-events-none disabled:opacity-50 cursor-pointer',
    '[&_svg]:pointer-events-none [&_svg:not([class*="size-"])]:size-4 shrink-0 [&_svg]:shrink-0',
    'outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
    'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
  ].join(' '),
  {
    variants: {
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-lg gap-1.5 px-3',
        lg: 'h-10 rounded-lg px-5',
        icon: 'size-8',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
);

export const ButtonPrimary: FC<ButtonPrimaryProps> = ({
  className,
  size,
  color = 'blue',
  tone = 'solid',
  asChild = false,
  startIcon: StartIcon,
  endIcon: EndIcon,
  children,
  ...props
}) => {
  const Comp = asChild ? Slot : 'button';

  const isIconOnly = !children && (StartIcon || EndIcon);

  return (
    <Comp
      data-slot="button"
      className={cn(
        buttonVariants({ size: isIconOnly ? 'icon' : size }),
        buttonTheme[color][tone],
        className,
      )}
      {...props}
    >
      {StartIcon}

      {children ? <span>{children}</span> : null}

      {EndIcon}
    </Comp>
  );
};
