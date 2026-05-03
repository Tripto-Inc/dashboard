import { DocumentBucket } from '@/features/document/types';
import { QueryObserverResult, RefetchOptions, UseMutationResult } from '@tanstack/react-query';
import { Column, ColumnDef, SortingState, Table } from '@tanstack/react-table';

export type ServerTableParams = {
  page: number;
  pageSize: number;
  filter: string;
  sort: SortingState;
};

export type ServerTableResponse<TData> = {
  data: TData[];
  total: number;
};

export type UseDataTableQuery<TData> = (params: ServerTableParams) => {
  data?: ServerTableResponse<TData>;
  isLoading: boolean;
  isFetching: boolean;
  isError?: boolean;
  error?: unknown;
};

export type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  initialSort?: { id: string; desc: boolean };
  initialPageSize?: number;
  useGetHook: (params: { pageSize: number; page: number; filter: string; sort: SortingState }) => {
    data?: { data: TData[]; total: number };
    refetch: (
      options?: RefetchOptions,
    ) => Promise<QueryObserverResult<ServerTableResponse<TData>, Error>>;
    isLoading: boolean;
    isFetching: boolean;
    isError: boolean;
    error?: any;
  };
  useDeleteHook?: () => UseMutationResult<unknown, unknown, string, unknown>;
  showRefetchButton?: boolean;
  showActionColumn?: boolean;
  showCreateButton?: boolean;
  entityName: string;
};

export type ServerTableQuery = {
  pageIndex: number;
  pageSize: number;
  globalFilter: string;
  sorting: SortingState;
};

export type ServerSideQueryParams = {
  sortBy: any;
  filter: any;
  pageSize: number;
  pageNumber: number;
  sortDirection: string;
};

export type ServerSideTableData<T> = {
  data: T[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
};

export type DataTableToolbarProps = {
  entityName: string;
  globalFilter: string;
  showCreateButton?: boolean;
  showRefetchButton?: boolean;
  onRefetch?: () => void;
  onGlobalFilterChange: (value: string) => void;
};

export type DataTablePaginationProps<TData> = {
  table: Table<TData>;
  total: number;
};

export type DataTableColumnHeaderProps<TData, TValue> = {
  column: Column<TData, TValue>;
  title: string;
};

export type DataTableImageCellProps = {
  id: string;
  title: string;
  bucket: DocumentBucket;
  placeholderPatternUrl?: string;
  placeholderPatternSize?: number;
  placeholderPatternOpacity?: number;
};
