export const generateApiParams = (searchParams: URLSearchParams) => {
  const page = Number(searchParams.get('page')) || 1;
  const pageSize = Number(searchParams.get('pageSize')) || 10;
  const filter = searchParams.get('filter') || '';
  const sortBy = searchParams.get('sortBy');
  const sortOrder = searchParams.get('sortOrder') || 'asc';

  const skip = (page - 1) * pageSize;

  return { filter, sortBy, sortOrder, skip, take: pageSize };
};
