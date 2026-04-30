'use client';

import { IconBell, IconMenu, IconSearch } from '@tabler/icons-react';
import { FC } from 'react';
import { HeaderProps } from './types';

export const Header: FC<HeaderProps> = ({ onToggleSidebar }) => {
  return (
    <header className="sticky top-0 z-30 flex min-h-16 items-center justify-between border-b border-slate-200 bg-white/80 px-4 backdrop-blur-md">
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="flex rounded-lg p-2 text-slate-500 hover:bg-slate-100"
        >
          <IconMenu size={20} />
        </button>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative hidden md:block">
          <IconSearch
            className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400"
            size={16}
          />
          <input
            type="text"
            placeholder="Search..."
            className="w-64 rounded-full border-none bg-slate-100 py-2 pr-4 pl-10 text-sm outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
        <button className="relative rounded-full p-2 text-slate-500 hover:bg-slate-100">
          <IconBell size={20} />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full border-2 border-white bg-red-500"></span>
        </button>
      </div>
    </header>
  );
};
