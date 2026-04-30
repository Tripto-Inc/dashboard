'use client';

import { TooltipProvider } from '@/components/ui/tooltip';
import type { FC, PropsWithChildren } from 'react';
import { QueryProvider } from './QueryProvider';

export const AppProviders: FC<PropsWithChildren> = ({ children }) => {
  return (
    <QueryProvider>
      <TooltipProvider>{children}</TooltipProvider>
    </QueryProvider>
  );
};
