import React, { useMemo } from 'react';
import { MdOutlineChevronLeft, MdOutlineChevronRight } from 'react-icons/md';
import { range } from 'utility/helper';

const Pagination = ({
  totalPages,
  currentPage,
  onChange,
}: {
  totalPages: number;
  currentPage: number;
  onChange: (pageNumber: number) => void;
}) => {
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
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = range(1, leftItemCount);

      return [...leftRange, DOTS, totalPages];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = range(totalPages - rightItemCount + 1, totalPages);
      return [firstPageIndex, DOTS, ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }

    return range(1, totalPages);
  }, [totalPages, currentPage, DOTS]);

  const lastPage = paginationRange[paginationRange.length - 1];

  return (
    <div className="full-width padding-vertical-32 center-items">
      <div className="flex-row align-center font-16">
        <div
          className="pointer height-30 width-30 hover-primary"
          onClick={() => currentPage !== 1 && onChange(currentPage - 1)}
        >
          {currentPage !== 1 && <MdOutlineChevronLeft size={20} />}
        </div>
        {paginationRange.map((pageNumber) => (
          <div
            className={`pointer height-30 width-30 hover-primary ${pageNumber === DOTS && 'neutral-dark'} ${
              pageNumber === currentPage && 'primary  text-bold'
            }`}
            onClick={() => {
              if (pageNumber !== DOTS && typeof pageNumber === 'number') {
                onChange(pageNumber);
              }
            }}
          >
            {pageNumber}
          </div>
        ))}
        <div
          className="pointer pointer height-30 width-30 hover-primary"
          onClick={() => currentPage !== lastPage && onChange(currentPage + 1)}
        >
          {currentPage !== lastPage && <MdOutlineChevronRight size={20} />}
        </div>
      </div>
    </div>
  );
};

export default Pagination;
