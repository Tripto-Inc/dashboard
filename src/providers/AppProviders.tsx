'use client';

import { TooltipProvider } from '@/components/ui/tooltip';
import { SessionProvider } from 'next-auth/react';
import type { FC, PropsWithChildren } from 'react';
import { Toaster } from 'react-hot-toast';
import { QueryProvider } from './QueryProvider';

export const AppProviders: FC<PropsWithChildren> = ({ children }) => {
  return (
    <SessionProvider>
      <QueryProvider>
        <TooltipProvider>{children}</TooltipProvider>
        <Toaster />
      </QueryProvider>
    </SessionProvider>
  );
};
