import { useSearchParams } from 'react-router-dom';

export const isValidCurrentPage = (totalCount: number, currentPage: number): boolean => {
  const [searchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const perPage = Number(params.get('perPage'));
  const currentPageIsValid = Math.ceil(totalCount / perPage) >= currentPage;

  return currentPageIsValid;
}
