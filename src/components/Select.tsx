import React, { Dispatch, SetStateAction } from 'react';
import { MdArrowDropDown, MdClose } from 'react-icons/md';
import ReactSelect, { ClearIndicatorProps, GroupBase } from 'react-select';

import { IOption } from 'models/generic.types';

const Select = <T,>({
  id,
  label,
  selectedItem,
  setSelectedItem,
  options,
  width,
  inline,
  required,
  placeholder = 'Select one...',
}: {
  id: string;
  label: string;
  selectedItem: IOption<T> | undefined;
  setSelectedItem: Dispatch<SetStateAction<IOption<T> | undefined>>;
  options: IOption<T>[];
  width?: number;
  inline?: boolean;
  required?: boolean;
  placeholder?: string;
}) => {
  return (
    <div
      id={id}
      className={`relative margin-vertical-8 black ${inline ? 'flex-row align-center' : 'flex-column'} ${
        width && !inline ? `width-${width}` : 'full-width'
      }`}
    >
      <div className={`margin-bottom-4 ${inline && 'margin-right-8'}`}>{label}</div>
      <ReactSelect
        options={options}
        defaultValue={selectedItem}
        onChange={(option) => setSelectedItem(option as IOption<T>)}
        placeholder={placeholder}
        isClearable={!required}
        className="react-select-container"
        classNamePrefix="react-select"
        components={{
          DropdownIndicator: () => (
            <div className="height-20">
              <MdArrowDropDown size={20} />
            </div>
          ),
          ClearIndicator: (props: ClearIndicatorProps<IOption<T>, false, GroupBase<IOption<T>>>) => (
            <div onClick={() => props.clearValue()} {...props.innerProps} className="height-20 hover-primary">
              <MdClose size={20} />
            </div>
          ),
        }}
      />
    </div>
  );
};

export default Select;
