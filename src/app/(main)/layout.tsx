'use client';

import { Header } from '@/components/shared/Header';
import { Sidebar } from '@/components/shared/Sidebar';
import clsx from 'clsx';
import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';

const MainLayout = ({ children }: { children: ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const media = window.matchMedia('(min-width: 1024px)');
    setIsSidebarOpen(media.matches);
  }, []);

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900">
      <Sidebar isOpen={isSidebarOpen} onToggleSidebar={() => setIsSidebarOpen((v) => !v)} />

      <main
        className={clsx(
          'flex min-w-0 flex-1 flex-col transition-all duration-300',
          isSidebarOpen ? 'lg:pl-64' : 'pl-0',
          isSidebarOpen ? 'w-[calc(100%-256px)]' : '',
        )}
      >
        <Header onToggleSidebar={() => setIsSidebarOpen((v) => !v)} />
        <div className="flex-1 p-4 lg:p-8">{children}</div>
      </main>
    </div>
  );
};

export default MainLayout;
