import { UseQueryResult } from '@tanstack/react-query';
import { ReactNode } from 'react';

export interface InfiniteDropdownOption {
  value: string;
  label: string;
}

export interface InfiniteDropdownProps<T> {
  id: string;
  value?: string;
  className?: string;
  placeholder?: string;
  ariaInvalid?: boolean;

  errorMessage?: ReactNode;
  SkeletonElement?: ReactNode;

  onChange: (value: string) => void;
  useDataHook: () => UseQueryResult<T[], Error>;
  renderCustomItem?: (item: T) => ReactNode;
}
