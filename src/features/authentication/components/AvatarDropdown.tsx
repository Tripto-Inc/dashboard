'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Image from 'next/image';
import { FC } from 'react';
import { useLogout } from '../hooks/useLogout';
import { AvatarDropdownProps } from '../types';
import { createMonogram } from '../utils';
import Link from 'next/link';

export const AvatarDropdown: FC<AvatarDropdownProps> = (props) => {
  const { name, email, image } = props;
  const logoutMutation = useLogout();

  return (
    <DropdownMenu>
      <div className="flex items-center gap-3 p-4">
        <div className="min-w-0 flex-1">
          {name && <p className="truncate text-right text-sm font-semibold">{name}</p>}
          {email && <p className="truncate text-xs text-slate-500">{email}</p>}
        </div>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="relative flex size-10 items-center justify-center overflow-hidden rounded-full bg-blue-100 font-bold text-blue-600"
          >
            {image ? (
              <Image fill alt="Profile Photo" src={image} className="absolute" />
            ) : name ? (
              createMonogram(name)
            ) : null}
          </Button>
        </DropdownMenuTrigger>
      </div>
      <DropdownMenuContent align="end" className="w-32">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link href="/user/profile" className="w-full">
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem disabled>Billing</DropdownMenuItem>
          <DropdownMenuItem disabled>Settings</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            variant="destructive"
            disabled={logoutMutation.isPending}
            onClick={logoutMutation.mutateAsync}
          >
            Log out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
