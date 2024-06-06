import { FC } from 'react';
import { ButtonSlider } from 'components/UI/ButtonSlider';
import { ButtonPagination } from 'components/UI/ButtonPagination';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import styles from './pagination.module.scss';

type Props = {
  length: number;
  currentPage: number;
  handlePagination: (pageNumber: number) => void;
};

export const Pagination: FC<Props> = ({
  length,
  currentPage,
  handlePagination,
}) => {
  const paginationNumbers = [];

  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const perPage = params.get('perPage');

  if (perPage) {
    dispatch({
      type: 'product/setProductsPerPage',
      payload: perPage,
    });
  }

  const productsPerPage = perPage ? Number(perPage) : length;

  for (let i = 1; i <= Math.ceil(length / productsPerPage); i++) {
    paginationNumbers.push(i);
  }

  const handleNextPage = () => {
    if (currentPage < paginationNumbers.length) {
      handlePagination(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      handlePagination(currentPage - 1);
    }
  };

  if (paginationNumbers.length <= 1) {
    return null;
  }

  if (paginationNumbers.length >= 7) {
    const visiblePages = 5;
    const startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
    const endPage = Math.min(
      paginationNumbers.length,
      startPage + visiblePages - 1,
    );

    const pages = [];
    if (startPage > 3) {
      pages.push(1);
      if (startPage > 4) {
        pages.push('...');
      }
    }
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return (
      <div className={styles.container}>
        <div className={styles.pagination}>
          <ButtonSlider
            iconType="arrowLeft"
            active={currentPage === 1}
            handleClick={handlePreviousPage}
          />
          {pages.map(page => (
            <div
              key={page}
              onClick={() => {
                if (typeof page === 'number') {
                  handlePagination(page);
                }
              }}
              className={`pagination-item ${
                currentPage === page ? 'active' : ''
              } ${page === '...' ? 'ellipsis' : ''}`}
            >
              {page === '...' ? (
                <span className={styles.ellipsis}>...</span>
              ) : (
                <ButtonPagination
                  text={page as number}
                  active={currentPage === page}
                  onClick={() => handlePagination(page as number)}
                />
              )}
            </div>
          ))}
          <ButtonSlider
            iconType="arrowRight"
            active={currentPage === paginationNumbers.length}
            handleClick={handleNextPage}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.paginationContainer}>
      <div className={styles.pagination}>
        <ButtonSlider
          iconType="arrowLeft"
          active={currentPage === 1}
          handleClick={handlePreviousPage}
        />
        {paginationNumbers.map(pageNumber => (
          <div
            key={pageNumber}
            onClick={() => handlePagination(pageNumber)}
            className={`pagination-item ${
              currentPage === pageNumber ? 'active' : ''
            }`}
          >
            <ButtonPagination
              text={pageNumber}
              active={currentPage === pageNumber}
              onClick={() => handlePagination(pageNumber)}
            />
          </div>
        ))}
        <ButtonSlider
          iconType="arrowRight"
          active={currentPage === paginationNumbers.length}
          handleClick={handleNextPage}
        />
      </div>
    </div>
  );
};
