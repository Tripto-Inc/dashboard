'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { FC, PropsWithChildren, useState } from 'react';
import { queryClient as queryClientInitial } from '@/lib/query-client';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export const QueryProvider: FC<PropsWithChildren> = ({ children }) => {
  const [queryClient] = useState(queryClientInitial);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
