'use client';

import { Input } from '@/components/ui/input';
import { IconPlus, IconRefresh } from '@tabler/icons-react';
import Link from 'next/link';
import { ButtonPrimary } from '../ButtonPrimary';
import { DataTableToolbarProps } from './types';

export const DataTableToolbar = ({
  entityName,
  globalFilter,
  showCreateButton,
  showRefetchButton,
  onRefetch,
  onGlobalFilterChange,
}: DataTableToolbarProps) => {
  return (
    <div className="flex items-center justify-between gap-10 py-4">
      <Input
        placeholder="Search all columns..."
        value={globalFilter}
        onChange={(event) => onGlobalFilterChange(event.target.value)}
        className="max-w-sm bg-white"
      />
      <div className="flex items-center gap-1">
        {showRefetchButton && (
          <ButtonPrimary
            size="icon"
            color="indigo"
            onClick={onRefetch}
            endIcon={<IconRefresh className="size-4.5" />}
          />
        )}
        {showCreateButton && (
          <Link href={`/${entityName}/new`}>
            <ButtonPrimary size="icon" color="yellow" endIcon={<IconPlus className="size-4.5" />} />
          </Link>
        )}
      </div>
    </div>
  );
};
