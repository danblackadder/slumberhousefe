import React, { Dispatch, SetStateAction } from 'react';
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';

const TableHeader = ({
  resetSort,
  sort,
  setSort,
  label,
  width,
}: {
  resetSort: () => void;
  sort: number;
  setSort: Dispatch<SetStateAction<number>>;
  label: string;
  width?: number;
}) => {
  const renderSortIcon = () => {
    switch (sort) {
      case 1:
        return <MdArrowDropDown />;
      case -1:
        return <MdArrowDropUp />;
      default:
        return;
    }
  };

  const handleSort = () => {
    resetSort();
    switch (sort) {
      case 0:
        setSort(1);
        break;
      case 1:
        setSort(-1);
        break;
      default:
        setSort(0);
        break;
    }
  };

  return (
    <div className={`padding-horizontal-8 ${width ? `width-${width}` : 'full-width'}`} onClick={() => handleSort()}>
      <div className="flex-row align-center pointer">
        {label} {renderSortIcon()}
      </div>
    </div>
  );
};

export default TableHeader;
