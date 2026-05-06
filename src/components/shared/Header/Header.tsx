'use client';

import { AvatarDropdownSkeleton } from '@/features/authentication';
import { AvatarDropdown } from '@/features/authentication/components/AvatarDropdown';
import { IconMenu } from '@tabler/icons-react';
import { useSession } from 'next-auth/react';
import { FC } from 'react';
import { HeaderProps } from './types';

export const Header: FC<HeaderProps> = ({ onToggleSidebar }) => {
  const { status, data } = useSession();

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

      {status === 'loading' ? (
        <AvatarDropdownSkeleton />
      ) : status === 'authenticated' ? (
        <AvatarDropdown name={data.user?.name} email={data.user?.email} image={data.user?.image} />
      ) : null}
    </header>
  );
};
