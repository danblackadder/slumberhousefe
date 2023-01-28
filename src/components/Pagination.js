import React, { useMemo } from 'react';
import { MdOutlineChevronLeft, MdOutlineChevronRight } from 'react-icons/md';
import { range } from 'utility/helper';
const Pagination = ({ totalPages, currentPage, onChange }) => {
  const DOTS = '...';
  const paginationRange = useMemo(() => {
    const siblingCount = 2;
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 2;
    const firstPageIndex = 1;
    const lastPageIndex = totalPages;
    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 2 * siblingCount;
      const leftRange = range(1, leftItemCount);
      return [...leftRange, DOTS, totalPages];
    }
    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 2 * siblingCount;
      const rightRange = range(totalPages - rightItemCount + 1, totalPages);
      return [firstPageIndex, DOTS, ...rightRange];
    }
    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
    return range(1, totalPages);
  }, [totalPages, currentPage, DOTS]);
  const lastPage = paginationRange[paginationRange.length - 1];
  return React.createElement(
    'div',
    { className: 'full-width padding-vertical-32 center-items' },
    React.createElement(
      'div',
      { className: 'flex-row align-center font-16' },
      React.createElement(
        'div',
        {
          className: 'pointer height-30 width-30 hover-primary',
          onClick: () => currentPage !== 1 && onChange(currentPage - 1),
        },
        currentPage !== 1 && React.createElement(MdOutlineChevronLeft, { size: 20 })
      ),
      paginationRange.map((pageNumber) =>
        React.createElement(
          'div',
          {
            key: pageNumber,
            className: `pointer height-30 width-30 hover-primary ${pageNumber === DOTS && 'neutral-dark'} ${
              pageNumber === currentPage && 'primary  text-bold'
            }`,
            onClick: () => {
              if (pageNumber !== DOTS && typeof pageNumber === 'number') {
                onChange(pageNumber);
              }
            },
          },
          pageNumber
        )
      ),
      React.createElement(
        'div',
        {
          className: 'pointer pointer height-30 width-30 hover-primary',
          onClick: () => currentPage !== lastPage && onChange(currentPage + 1),
        },
        currentPage !== lastPage && React.createElement(MdOutlineChevronRight, { size: 20 })
      )
    )
  );
};
export default Pagination;
