'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { InfiniteDropdownOption, InfiniteDropdownProps } from './types';
import { IconChevronDown } from '@tabler/icons-react';
import clsx from 'clsx';

export const InfiniteDropdown = <T extends InfiniteDropdownOption>(
  props: InfiniteDropdownProps<T>,
) => {
  const {
    id,
    value,
    onChange,
    className,
    placeholder,
    useDataHook,
    ariaInvalid,

    renderCustomItem,
    SkeletonElement,
    errorMessage,
  } = props;

  const { data, error, isLoading } = useDataHook();

  if (isLoading) {
    return SkeletonElement || <Skeleton className="h-11.5 w-full rounded-lg" />;
  }

  if (error) {
    return <p>{errorMessage || 'Error loading data.'}</p>;
  }

  return (
    <div className="relative">
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={clsx(
          'h-11.5 w-full appearance-none rounded-lg border bg-white px-4 py-2.5 text-sm',
          ariaInvalid ? 'border-destructive' : 'border-slate-200',
          !value && 'text-muted-foreground',
          className,
        )}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}

        {data?.map((item) => (
          <option key={item.value} value={item.value}>
            {renderCustomItem ? renderCustomItem(item) : item.label}
          </option>
        ))}
      </select>
      <IconChevronDown
        size={16}
        className="pointer-events-none absolute top-4 right-3 bg-white text-slate-400"
      />
    </div>
  );
};
