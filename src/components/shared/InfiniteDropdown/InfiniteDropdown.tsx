'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import clsx from 'clsx';
import { InfiniteDropdownOption, InfiniteDropdownProps } from './types';

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

  const { data, error, isFetching } = useDataHook();

  if (isFetching) {
    return SkeletonElement || <Skeleton className="h-11.5 w-full rounded-lg" />;
  }

  if (error) {
    return <p>{errorMessage || 'Error loading data.'}</p>;
  }

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger
        id={id}
        className={clsx('w-full', className, !value && 'text-slate-400!')}
        aria-invalid={ariaInvalid}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent position='popper' className='max-h-80 overflow-y-auto'>
        {data?.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {renderCustomItem ? renderCustomItem(item) : item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
