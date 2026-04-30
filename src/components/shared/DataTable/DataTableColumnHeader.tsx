'use client';

import { IconArrowDown, IconArrowUp, IconSelector } from '@tabler/icons-react';
import clsx from 'clsx';
import { ButtonPrimary } from '../ButtonPrimary';
import { DataTableColumnHeaderProps } from './types';

export const DataTableColumnHeader = <TData, TValue>({
  column,
  title,
}: DataTableColumnHeaderProps<TData, TValue>) => {
  const isSortable = column.getCanSort();
  const sorted = column.getIsSorted();

  return (
    <ButtonPrimary
      color="black"
      tone="ghost"
      className={clsx('my-2 h-12', !isSortable && 'pointer-events-none')}
      onClick={() => isSortable && column.toggleSorting(sorted === 'asc')}
      endIcon={
        isSortable ? (
          sorted === 'asc' ? (
            <IconArrowUp />
          ) : sorted === 'desc' ? (
            <IconArrowDown />
          ) : (
            <IconSelector />
          )
        ) : undefined
      }
    >
      <span className="font-medium">{title}</span>
    </ButtonPrimary>
  );
};
