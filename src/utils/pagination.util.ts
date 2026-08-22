export type PaginationMeta = {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

export function countSkip({ page, pageSize }: { page: number; pageSize: number }) {
  return (page - 1) * pageSize;
}

export function makePaginationMeta({ page, pageSize, totalItems }: { page: number; pageSize: number; totalItems: number }): PaginationMeta {
  const totalPages = Math.ceil(totalItems / pageSize);

  return {
    page,
    pageSize,
    totalItems,
    totalPages,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
  };
}
