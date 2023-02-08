import React, { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from 'react';
import { MdArrowDropDown, MdClose } from 'react-icons/md';
import ReactSelect from 'react-select';
import CreatableReactSelect from 'react-select/creatable';
import { ClearIndicatorProps, GroupBase } from 'react-select/dist/declarations/src';

import useClickOutside from 'hooks/useClickOutside.hook';
import { IOption } from 'models/generic.types';
import { capitalize } from 'utility/helper';

import Button from './Button';

const Multiselect = <T,>({
  id,
  label,
  selectedItems,
  setSelectedItems,
  options,
  width,
  inline,
  placeholder = 'Select items...',
  creatable = false,
}: {
  id: string;
  label: string;
  selectedItems: IOption<T>[];
  setSelectedItems: Dispatch<SetStateAction<IOption<T>[]>>;
  options: IOption<T>[];
  width?: number;
  inline?: boolean;
  placeholder?: string;
  creatable?: boolean;
}) => {
  const DropdownIndicator = () => {
    return (
      <div className="height-20">
        <MdArrowDropDown size={20} />
      </div>
    );
  };

  const ClearIndicator = (props: ClearIndicatorProps<IOption<T>, true, GroupBase<IOption<T>>>) => {
    return (
      <div onClick={() => props.clearValue()} {...props.innerProps} className="height-20 hover-primary">
        <MdClose size={20} />
      </div>
    );
  };

  return (
    <div
      id={id}
      className={`relative margin-vertical-8 black ${inline ? 'flex-row align-center' : 'flex-column'} ${
        width && !inline ? `width-${width}` : 'full-width'
      }`}
    >
      <div className={`margin-bottom-4 ${inline && 'margin-right-8'}`}>{label}</div>
      {creatable ? (
        <CreatableReactSelect
          isMulti={true}
          options={options}
          defaultValue={selectedItems}
          onChange={(options) => {
            setSelectedItems(options as IOption<T>[]);
          }}
          placeholder={placeholder}
          className="react-select-container"
          classNamePrefix="react-select"
          components={{
            DropdownIndicator,
            ClearIndicator,
            MultiValueRemove: (props) => {
              return (
                <div {...props.innerProps}>
                  <MdClose size={16} />
                </div>
              );
            },
          }}
        />
      ) : (
        <ReactSelect
          isMulti={true}
          options={options}
          defaultValue={selectedItems}
          onChange={(options) => {
            setSelectedItems(options as IOption<T>[]);
          }}
          placeholder={placeholder}
          className="react-select-container"
          classNamePrefix="react-select"
          components={{
            DropdownIndicator,
            ClearIndicator,
          }}
        />
      )}
    </div>
  );
};

export default Multiselect;
